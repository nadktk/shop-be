import productsService from '../services/products';
import { successResponse, serverErrorResponse } from '../../shared/utils';

/**
 * getProductsList
 */
export const getProductsList = async () => {
    try {
        console.log(`
            get products list function was invoked [${new Date()}]
        `);
        const products = await productsService.getList();

        return successResponse(products);
    } catch (e) {
        console.log(e);

        return serverErrorResponse({
            message: e.message,
        });
    }
};
