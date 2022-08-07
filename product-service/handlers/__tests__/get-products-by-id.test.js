import { getProductById } from '../get-product-by-id';
import utils from '../../../shared/utils';
import productsService from '../../services/products';

jest.mock('../../services/products', () => ({
    getOne: jest.fn()
}));

jest.mock('../../../shared/utils', () => ({
    successResponse: jest.fn(),
    notFoundResponse: jest.fn(),
}));

const mockedProduct = {
    id: '7567ec4b-b10c-48c5-9345-fc73c48a80a0',
    title: 'title',
    description: 'description',
    price: 100,
    count: 100
};

describe('tests for getProductById handler', () => {

    afterEach(() => jest.clearAllMocks());

    it('should return product by id', async () => {
        productsService.getOne.mockResolvedValue(mockedProduct);
    
        await getProductById({
            pathParameters: {
                productId: '7567ec4b-b10c-48c5-9345-fc73c48a80a0'
            },
        });
    
        expect(utils.successResponse).toBeCalledTimes(1);
        expect(utils.successResponse).toHaveBeenCalledWith(mockedProduct);
    });

    it('should return 404 status code with descriptive error', async () => {
        productsService.getOne.mockResolvedValue(null);
    
        await getProductById({
            pathParameters: {
                productId: '7567ec4b-b10c-48c5-9345-fc73c48a80a0'
            },
        });
    
        expect(utils.successResponse).toBeCalledTimes(0);
        expect(utils.notFoundResponse).toBeCalledTimes(1);
        expect(utils.notFoundResponse).toHaveBeenCalledWith({
            message: 'Product not found'
        });
    });

});
