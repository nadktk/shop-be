import productsService from '../services/products';
import { successResponse } from '../utils';

/**
 * getProductsList
 */
export const getProductsList = async () => {
    const products = await productsService.getList();

    return successResponse(products);
};
