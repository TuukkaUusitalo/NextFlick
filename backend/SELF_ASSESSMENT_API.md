# Backend API Self-Assessment

This document summarizes the backend API implementation, highlights issues we found, and describes improvements made or recommended. Each section follows a before/after style with concrete examples where applicable.

---

## 1. Movie Proxy Endpoint

- Initially, the movie controller returned the raw fetch response object directly to the client:

```js
// controllers/movieControllers.js
const getMoviesDatabase = async (req, res) => {
  const { endpoint } = req.params;
  try {
    const response = await fetch(`${url}/${endpoint}`, {
      method: 'GET',
      headers: headers}
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Failed to call", error: error.message });
  }
};
```

- Problem: `response` is a fetch Response object, not the parsed JSON. Sending it directly returns an object that doesn't contain the expected data. Also, the code didn't forward response status codes or handle non-OK responses.

- Improved version:

```js
const getMoviesDatabase = async (req, res, next) => {
  const { endpoint } = req.params;
  try {
    const response = await fetch(`${url}/${endpoint}`, { headers });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ message: 'Upstream API error', details: text });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
```

- Key Improvements:
  - Parse and return JSON from the upstream API.
  - Propagate upstream error status to clients.
  - Use `next(error)` to let centralized error handling log and format the response.

---

## 2. Image Endpoints (File Serving & Upload)

- Initially, image routes served files with minimal validation and uploads relied on middleware with unclear error paths.

- Issues observed:
  - Missing validation for `filePath` or `userId` could lead to path traversal if not sanitized.
  - Uploads didn't consistently validate file type or size.
  - Error responses were inconsistent.

- Improvements:
  - Validate and sanitize `filePath` and `userId` parameters.
  - Limit uploaded file size and allow only specific MIME types (e.g., image/jpeg, image/png).
  - Centralize upload error handling in `customMiddleware` and return consistent error objects.

Example upload middleware adjustment:

```js
// middleware/customMiddleware.js
const upload = multer({
  storage: multer.diskStorage({ /* ... */ }),
  fileFilter: (req, file, cb) => {
    if (!['image/jpeg', 'image/png'].includes(file.mimetype)) {
      return cb(new Error('Invalid file type'), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});
```

---

## 3. User Endpoints & Authentication

- Initially, some user endpoints were unprotected or validation was minimal. For example, update and delete operations required `requireAuth`, but input validation was limited.

- Improvements made / recommended:
  - Ensure `requireAuth` is applied consistently to all endpoints that mutate resources (PUT, DELETE, POST where applicable).
  - Add request-level validation (e.g., `express-validator`) for signup, login, and updates to return 400s for invalid input instead of letting Mongoose throw errors.
  - Hash passwords using bcrypt and never return the password hash in responses.

Example signup validation addition:

```js
// routes/userRouter.js
const { body, validationResult } = require('express-validator');

router.post(
  '/signup',
  [
    body('username').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 8 })
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  createUser
);
```

---

## 4. Reviews Endpoints

- Initially, review creation and updates did not validate user/movie existence, leading to potential orphan reviews.

- Improvements:
  - On create/update, verify the referenced `userId` and `movieId` exist (or at least the user exists in our DB) and return 404 if not found.
  - Add pagination to list endpoints to handle large datasets.

Example check before creating a review:

```js
const createReview = async (req, res, next) => {
  const { userId, movieId, rating, comment } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  // optionally validate movieId via external API or internal reference
  const review = await Review.create({ userId, movieId, rating, comment });
  res.status(201).json(review);
};
```

---

## 5. Error Handling & Logging

- Initially, error responses were inconsistent and logging was limited.

- Improvements:
  - Implement a centralized `errorHandler` middleware that returns consistent JSON errors and logs stack traces.
  - Add request logging (already present in `customMiddleware`) and use a structured logger (e.g., Winston) for production.

Example error handler:

```js
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Internal Server Error' });
}
```

---

## 6. Tests

- There was no test suite originally. I added a basic `tests/` folder with `supertest`-based endpoint checks to validate server routes. These are smoke tests and should be extended to include auth flows, database mocking, and edge cases.

---

## 7. Security & Performance Recommendations

- Add `helmet` to set secure HTTP headers.
- Add `rate-limit` to protect the API from abuse.
- Ensure sensitive configuration is only in `.env` and `.env.example` lists required keys.
- Add indexes to MongoDB for frequently queried fields (e.g., `user.email`).

---

## 8. Follow-ups

- Convert movie proxy implementation to use a dedicated `movieService.js` to separate concerns and add caching for popular endpoints.
- Expand tests with mocked MongoDB (e.g., `mongodb-memory-server`) to validate controllers without hitting real DB.
- Add API documentation (Swagger) and a Postman collection for manual testing.

---

### Status

- Draft created and saved as `SELF_ASSESSMENT_API.md` in the `backend/` folder.
