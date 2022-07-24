import productsService from '../services/products';
import { successResponse, notFoundResponse } from '../utils';

/**
 * getProductsList
 */
export const getProductById = async (event) => {
    const { productId } = event.pathParameters;
    const product = await productsService.getOne(productId);

    if (!product) {
        return notFoundResponse({
            message: 'Product not found'
        })
    }

    return successResponse(product);
};
