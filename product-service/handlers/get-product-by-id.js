import { Logger } from '../../shared/logger';
import {
    successResponse,
    notFoundResponse,
    serverErrorResponse,
} from '../../shared/utils';
import productsService from '../services/products';

const logger = new Logger('getProductById');

/**
 * getProductsList
 */
export const getProductById = async (event) => {
    try {
        logger.log(`
        get product by id function invocation
        with following parameter:
        ${event.pathParameters.productId}
    `);

        const { productId } = event.pathParameters;
        const product = await productsService.getOne(productId);

        if (!product) {
            return notFoundResponse({
                message: 'Product not found',
            });
        }

        return successResponse(product);
    } catch (e) {
        logger.error(e);

        return serverErrorResponse({
            message: e.message,
        });
    }
};
