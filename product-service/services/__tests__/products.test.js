const productData = require('../products.json');

import productsService from '../products';

describe('--', () => {
    it('should return product by id', async () => {
        const result = await productsService.getOne('7567ec4b-b10c-48c5-9345-fc73c48a80a0');
    
        expect(result).toEqual({
            count: 6,
            description: "Short Product Description3",
            id: "7567ec4b-b10c-48c5-9345-fc73c48a80a0",
            price: 100,
            title: "Practical Statistics for Data Scientists"
        });
    });

    it('should return all products', async () => {
        const result = await productsService.getList();
    
        expect(result).toEqual(productData);
    });
});
