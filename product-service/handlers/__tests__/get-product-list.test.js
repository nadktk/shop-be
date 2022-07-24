import { getProductsList } from '../get-products-list';
import utils from '../../utils';
import productsService from '../../services/products';

jest.mock('../../services/products', () => ({
    getList: jest.fn()
}));

jest.mock('../../utils', () => ({
    successResponse: jest.fn(),
}));

const mockedList = [];

describe('tests for getProductsList handler', () => {

    afterEach(() => jest.clearAllMocks());

    it('should return list of the products', async () => {
        productsService.getList.mockResolvedValue(mockedList);
    
        await getProductsList({});
    
        expect(utils.successResponse).toBeCalledTimes(1);
        expect(utils.successResponse).toHaveBeenCalledWith(mockedList);
    });
});
