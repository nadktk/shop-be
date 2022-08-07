import productsService from '../products';

const mockProduct = {
    count: 6,
    description: 'Short Product Description3',
    id: '7567ec4b-b10c-48c5-9345-fc73c48a80a0',
    price: 100,
    title: 'Practical Statistics for Data Scientists',
};
const mockRelease = jest.fn();
const mockQuery = jest.fn(async () => ({
    rows: [mockProduct],
}));

jest.mock('../../db/pool', () => ({
    pool: {
        connect: jest.fn(() => ({
            query: mockQuery,
            release: mockRelease,
        })),
    },
}));

describe('Products service tests', () => {
    afterEach(() => jest.clearAllMocks());

    it('should return all products', async () => {
        const result = await productsService.getList();

        expect(result).toEqual([mockProduct]);
    });

    it('should log error and throw', async () => {
        mockQuery.mockRejectedValue('Ooops...');
        const result = productsService.getList();

        expect(result).rejects.toEqual('Ooops...');
    });

    it('should return product by id', async () => {
        mockQuery.mockResolvedValue({ rows: [mockProduct] });
        const result = await productsService.getOne(mockProduct.id);

        expect(result).toEqual(mockProduct);
    });

    it('should log error and throw (get one)', async () => {
        mockQuery.mockRejectedValue('Ooops...');
        const result = productsService.getOne();

        expect(result).rejects.toEqual('Ooops...');
    });

    it('should not return product by id (if it is not found)', async () => {
        mockQuery.mockResolvedValue({ rows: [] });
        const result = await productsService.getOne('fake-id');

        expect(result).toEqual(undefined);
    });

    it('should create product', async () => {
        mockQuery.mockResolvedValue({ rows: [mockProduct] });
        const result = await productsService.create('fake-id');

        expect(result).toEqual(mockProduct);
    });

    it('should not create product, rollback and throw', async () => {
        mockQuery.mockRejectedValueOnce('Ooops...');
        const result = productsService.create({});

        expect(result).rejects.toEqual('Ooops...');
    });
});
