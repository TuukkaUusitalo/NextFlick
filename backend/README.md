# Backend API endpoints list

**Base API URL**
> localhost:4000/api

---
**image** <br>
/image
- GET /movie/:size/:filePath
    - Get movie image, poster, ... from file path provided by movie API <br>
    - Example call: GET http://localhost:4000/api/image/movie/original/x26MtUlwtWD26d0G0FXcppxCJio.jpg

- GET /user/:userId
    - Return profile picture of user with provided userId <br>
    - Example call: GET http://localhost:4000/api/image/user/68d56998ba0933a9f153fd57

- POST /user/:userId
    - Upload a new profile picture for user with the provided Id <br>
    - Example call: POST http://localhost:4000/api/image/user/68d56998ba0933a9f153fd57 <br>
    - Body: form-data, {image: file-name.png} with image as key and file-name.png as value <br>

---
**movies** <br>
/movies
- GET /:endpoint <br>
    - Redirect all GET request to https://api.themoviedb.org/3 <br>
    - For reference use [themoviedb](https://developer.themoviedb.org/reference/) instead <br>

---
**reviews** <br>
/reviews
- GET /
    - Get all review in the database <br>
    - Example call: GET http://localhost:4000/api/reviews

- GET /user/:userId
    - Get all review made by user with provided Id <br>
    - Example: GET http://localhost:4000/api/reviews/user/68d56998ba0933a9f153fd57

- GET /movie/:movieId
    - Get all review for the movie with provided Id <br>
    - Example: GET http://localhost:4000/api/reviews/movie/617126

- POST /
    - Create a new review <br>
    - Example: POST http://localhost:4000/api/reviews <br>
    - Body: 
    ```js
    { 
        "userId": "68d56998ba0933a9f153fd57", 
        "movieId": "617126", 
        "body": "lorem ipsum", 
        "rating": "5"
    }
    ```

- GET /:reviewId
    - Get a review by Id

- PUT /:reviewId
    - Update a review by Id

- DELETE /:reviewId
    - Delete a review by Id

---
**users** <br>
/users

- GET / 
    - Get all users <br>
    - This is dangerous as all users information will be returned <br>
    - Only use for testing, the endpoint will be removed after development <br>
    - Once in production should only return a list of Id and name (used for searching)

- POST /signup
    - Create a new user <br>
    - Body:
    ```js
    {
        "username": "Matti",
        "email": "matti@example.com",
        "password": "Password@1234"
    }
    ``` 
Note: weak password will cause a error

- POST /login
    - User logging in and return token<br>
    - Body:
    ```js
    {
        "username": "Matti",
        "password": "Password@1234"
    }
    ```

- GET /:userId
    - Return user information from provided Id

- POST /recommend/:userId
    - Calling to LLM for movie recommendation based on user preferences saved <br>
    - Body:
    ```js
    {
        "prompt":"show me some relaxing new movies",
        "usePreferences":false
    }
    ```

- PUT /:userId
    - Modify user profile based on provided Id (Recommended to only change username or bio, if adding movies to list use other endpoints instead) <br>

**NOTE**: The following update endpoints will replace the old list with the one received, so save the old list and add on to it before returning to the server
- PUT /preferences/:userId
    - Update user's preferences<br>

    - Body:
    ```js
    {
        "genrePreferences":["genre1","genre2"],
        "moviePreferences":["movie1","movie2"]
    }
    ```
Note: Saving preference as plain text because it will be used to call to LLM

- PUT /watched/:userId
    - Update user's watched list<br>
    - Body:
    ```js
    {
        "watchedMovies":[{
            "name":"movieName1",
            "movieId":"movieId1"
        },{
            "name":"movieName2",
            "movieId":"movieId2"
        }]
    }
    ```

- PUT /yettowatch/:userId
    - Update user's yet to watch list <br>
    - Body:
    ```js
    {
        "yetToWatchMovies":[{
            "name":"movieName1",
            "movieId":"movieId1"
        },{
            "name":"movieName2",
            "movieId":"movieId2"
        }]
    }
    ```
- DELETE /:userId
    - Delete the user profile with the provided Id