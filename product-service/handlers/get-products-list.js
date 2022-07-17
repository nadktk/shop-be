/**
 * getProductsList
 * @param {*} event 
 * @returns 
 */
module.exports = async (event) => {

    console.log(`Lambda get products list invoked with`, event);

    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: 'getProductsList OK',
                result: [{
                    id: 1,
                    title: 'Hello World',
                    price: 123,
                }]
            },
            null,
            2
        ),
    };
};
