import utils from '../../../shared/utils';
import { importProductsFile } from '../import-products-file';
import s3Service from '../../services/s3';

jest.mock('../../services/s3', () => ({
    prepareSignedUrl: jest.fn(),
}));

jest.mock('../../../shared/utils', () => ({
    successResponse: jest.fn(),
    serverErrorResponse: jest.fn(),
}));

describe('tests for importProductsFile handler', () => {
    afterEach(() => jest.clearAllMocks());

    it('should return signed url', async () => {
        const mockedFileName = 'testFileName.csv';
        const mockedUrl = `http://someurl.com/${mockedFileName}`;
        s3Service.prepareSignedUrl.mockReturnValue(mockedUrl);

        await importProductsFile({
            queryStringParameters: {
                name: mockedFileName,
            },
        });

        expect(utils.successResponse).toBeCalledTimes(1);
        expect(utils.successResponse).toHaveBeenCalledWith(mockedUrl);
    });

    it('should return server error', async () => {
        const mockedFileName = 'testFileName.csv';
        const mockedError = 'Something went wrong';
        s3Service.prepareSignedUrl.mockImplementation(() => {
            throw new Error(mockedError);
        });

        await importProductsFile({
            queryStringParameters: {
                name: mockedFileName,
            },
        });

        expect(utils.serverErrorResponse).toBeCalledTimes(1);
        expect(utils.serverErrorResponse).toHaveBeenCalledWith({
            message: mockedError,
        });
    });
});
