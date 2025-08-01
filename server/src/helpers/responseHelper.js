const successResponse = (data, statusCode = 200) => ({
  status: 'success',
  data
});

const errorResponse = (message, statusCode = 500) => ({
  status: 'error',
  message
});

module.exports = {
  successResponse,
  errorResponse
}; 