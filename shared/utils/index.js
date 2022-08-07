module.exports.successResponse = (data, statusCode = 200) => ({
    statusCode,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
    },
    body: typeof data === 'string' ? data : JSON.stringify(
        data,
        null,
        2,
    ),
});

module.exports.notFoundResponse = (data) => ({
    statusCode: 404,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(
        data,
        null,
        2,
    ),
});

module.exports.badRequest = (data) => ({
    statusCode: 400,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(
        data,
        null,
        2,
    ),
});

module.exports.serverErrorResponse = (data) => ({
    statusCode: 500,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(
        data,
        null,
        2,
    ),
});
