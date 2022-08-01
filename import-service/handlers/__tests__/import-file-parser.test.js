import { importFileParser } from '../import-file-parser';
import utils from '../../../shared/utils';
import s3Service from '../../services/s3';

jest.mock('../../services/s3', () => ({
    parseCsvFile: jest.fn()
}));

jest.mock('../../../shared/utils', () => ({
    successResponse: jest.fn(),
    serverErrorResponse: jest.fn(),
    badRequest: jest.fn(),
}));

describe('tests for importFileParser handler', () => {

    afterEach(() => jest.clearAllMocks());

    it('should parse csv file', async () => {
        const mockedFileName = 'testFileName.csv';
        s3Service.parseCsvFile.mockReturnValue();
    
        await importFileParser({
            Records: [{
                s3: {
                    object: {
                        key: mockedFileName
                    }
                }
            }]
        });
    
        expect(utils.successResponse).toBeCalledTimes(1);
        expect(utils.successResponse).toHaveBeenCalledWith('ok');
    });

    it('should return server error', async () => {
        const mockedFileName = 'testFileName.csv';
        const mockedError = 'Something went wrong';
        s3Service.parseCsvFile.mockImplementation(() => {
            throw new Error(mockedError);
          });
    
        await importFileParser({
            Records: [{
                s3: {
                    object: {
                        key: mockedFileName
                    }
                }
            }]
        });
    
        expect(utils.serverErrorResponse).toBeCalledTimes(1);
        expect(utils.serverErrorResponse).toHaveBeenCalledWith({
            message: mockedError,
        });
    });

    it('should return bad request', async () => {
        s3Service.parseCsvFile.mockReturnValue();
    
        await importFileParser({});
    
        expect(utils.badRequest).toBeCalledTimes(1);
        expect(utils.badRequest).toHaveBeenCalledWith({
            message: 'No file key value',
        });
    });
});
