module.exports.successResponse = (data) => {
    return {
        statusCode: 200,
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
