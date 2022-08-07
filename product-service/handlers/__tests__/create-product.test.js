import utils from '../../../shared/utils';
import { createProduct } from '../create-product';
import productsService from '../../services/products';

jest.mock('../../services/products', () => ({
    create: jest.fn(),
}));

jest.mock('../../../shared/utils', () => ({
    successResponse: jest.fn(),
    badRequest: jest.fn(),
    serverErrorResponse: jest.fn(),
}));

describe('tests for createProduct handler', () => {
    afterEach(() => jest.clearAllMocks());

    it('should return created product', async () => {
        const newProduct = {
            title: 'test',
            description: 'test',
            count: 10,
            price: 10,
        };
        productsService.create.mockResolvedValue(newProduct);

        await createProduct({
            body: JSON.stringify(newProduct),
        });

        expect(utils.successResponse).toBeCalledTimes(1);
        expect(utils.successResponse).toHaveBeenCalledWith(newProduct, 201);
    });

    it('should return bad request error with incorrect product data', async () => {
        await createProduct({
            body: JSON.stringify({}),
        });

        expect(utils.badRequest).toBeCalledTimes(1);
        expect(utils.badRequest).toHaveBeenCalledWith({
            message: 'Incorrect product data',
            errors: [
                {
                    error: 'title is a required field and should be longer than 3 characters',
                    field: 'title',
                },
                {
                    error: 'count is a required field and should be positive integer value',
                    field: 'count',
                },
                {
                    error: 'price is a required field and should be positive integer value',
                    field: 'price',
                },
            ],
        });
    });

    it('should return server error if something went wrong', async () => {
        const newProduct = {
            title: 'test',
            description: 'test',
            count: 10,
            price: 10,
        };
        const errorMsg = 'Ooops...';
        productsService.create.mockRejectedValue(new Error(errorMsg));

        await createProduct({
            body: JSON.stringify(newProduct),
        });

        expect(utils.serverErrorResponse).toBeCalledTimes(1);
        expect(utils.serverErrorResponse).toHaveBeenCalledWith({
            message: errorMsg,
        });
    });
});
