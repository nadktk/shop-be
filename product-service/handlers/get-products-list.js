import { Logger } from '../../shared/logger';
import { successResponse, serverErrorResponse } from '../../shared/utils';
import productsService from '../services/products';

const logger = new Logger('getProductsList');

/**
 * getProductsList
 */
export const getProductsList = async () => {
    try {
        logger.log('get products list function invocation');
        const products = await productsService.getList();

        return successResponse(products);
    } catch (e) {
        logger.error(e);

        return serverErrorResponse({
            message: e.message,
        });
    }
};
