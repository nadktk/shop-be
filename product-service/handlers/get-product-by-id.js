const productsService = require('../services/products');
const { successResponse, notFoundResponse } = require('../utils');

/**
 * getProductsList
 * @param {*} event 
 * @returns 
 */
module.exports = async (event) => {
    const { productId } = event.pathParameters;
    const product = await productsService.getOne(productId);

    if (!product) {
        return notFoundResponse({
            message: 'Product not found'
        })
    }

    return successResponse(product);
};
