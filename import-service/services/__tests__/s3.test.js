import s3Service from '../s3';

describe('s3Service tests', () => {

    it('should prepare signed url', async () => {
        const mockedFileName = 'products.csv';
        const result = s3Service.prepareSignedUrl(mockedFileName);
    
        expect(result).toEqual(`http://some-url.com/uploaded/${mockedFileName}`);
    });

    it('should parse csv file', async () => {
        const mockedKey = 'uploaded/products.csv';
        const result = await s3Service.parseCsvFile(mockedKey);
    
        expect(result).toEqual([]);
    });
});
