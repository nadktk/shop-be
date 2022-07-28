import productsService from '../services/products';
import { successResponse } from '../utils';

/**
 * getProductsList
 */
export const getProductsList = async () => {
    console.log(`
        get products list function was invoked [${new Date()}]
    `);
    const products = await productsService.getList();

    return successResponse(products);
};
