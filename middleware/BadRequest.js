/* eslint-disable indent */
module.exports = (error, request, response, next) => {
    console.log(error.name)
    response.status(400).end()
}
