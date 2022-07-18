const productsService = require('../services/products');
const { successResponse } = require('../utils');

/**
 * getProductsList
 * @param {*} event 
 * @returns 
 */
module.exports = async () => {
    const products = await productsService.getList();

    return successResponse(products);
};
