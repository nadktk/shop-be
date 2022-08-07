import utils from '../../../shared/utils';
import { getProductsList } from '../get-products-list';
import productsService from '../../services/products';

jest.mock('../../services/products', () => ({
    getList: jest.fn(),
}));

jest.mock('../../../shared/utils', () => ({
    successResponse: jest.fn(),
    serverErrorResponse: jest.fn(),
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

    it('should return server error response if something went wrong', async () => {
        const errorMsg = 'Ooops...';
        productsService.getList.mockRejectedValue(new Error(errorMsg));

        await getProductsList({});

        expect(utils.serverErrorResponse).toBeCalledTimes(1);
        expect(utils.serverErrorResponse).toHaveBeenCalledWith({
            message: errorMsg,
        });
    });
});
