import productsService from '../services/products';
import { successResponse, notFoundResponse } from '../utils';

/**
 * getProductsList
 */
export const getProductById = async (event) => {
    try {
        console.log(`
            get product by id function was invoked [${new Date()}]
            with following parameter:
            ${event.pathParameters.productId}
        `);

        const { productId } = event.pathParameters;
        const product = await productsService.getOne(productId);

        if (!product) {
            return notFoundResponse({
                message: 'Product not found'
            })
        }

        return successResponse(product);
    } catch (e) {
        console.log(e);

        return serverErrorResponse({
            message: e.message,
        });
    }
};
