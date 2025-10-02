const multer = require('multer');

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
 
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  response.status(500);
  response.json({
    message: error.message,
  })
}

const upload = multer({ storage: multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './assets/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E4);
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})
});
const uploadMiddleware = upload.single('image');
module.exports = { 
    requestLogger,
    unknownEndpoint, 
    errorHandler,
    uploadMiddleware
}