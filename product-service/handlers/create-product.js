import productsService from '../services/products';
import { successResponse, badRequest } from '../utils';

const validateProductBody = (payload) => {
    const cleanTitle = payload.title && String(payload.title).trim();
    let isValid = true;
    let errors = [];

    if (!(cleanTitle && cleanTitle.length >= 3)) {
        isValid = false;
        errors.push({
            field: 'title',
            error: 'title is a required field and should be longer than 3 characters',
        });
    }

    if (!(payload.count && Number.isInteger(payload.count) && payload.count > 0)) {
        isValid = false;
        errors.push({
            field: 'count',
            error: 'count is a required field and should be positive integer value',
        });
    }

    if (!(payload.price && Number.isInteger(payload.price) && payload.price > 0)) {
        isValid = false;
        errors.push({
            field: 'price',
            error: 'price is a required field and should be positive integer value',
        });
    }
    
    return {
        isValid,
        errors: errors.length ? errors : undefined,
        ...(isValid && {
            productBody: {
                title: cleanTitle,
                count: payload.count,
                price: payload.price,
                description: payload.description,
            }
        })
    };
}

/**
 * createProduct
 */
export const createProduct = async (event) => {

    const payload = JSON.parse(event.body);
    const { isValid, errors, productBody } = validateProductBody(payload);
    if (!isValid) {
        return badRequest({
            message: 'Incorrect product data',
            errors,
        });
    }

    const product = await productsService.create(productBody);

    return successResponse(product, 201);
};
