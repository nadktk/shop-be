module.exports.successResponse = (data, statusCode = 200) => {
    return {
        statusCode: statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(
            data,
            null,
            2
        )
    }
};

module.exports.notFoundResponse = (data) => {
    return {
        statusCode: 404,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(
            data,
            null,
            2
        )
    }
};

module.exports.badRequest = (data) => {
    return {
        statusCode: 400,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(
            data,
            null,
            2
        )
    }
};
