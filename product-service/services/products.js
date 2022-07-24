import { client } from '../db/client';

class ProductsService {
    async getList() {
        try {
            await client.connect();
                   
            const products = await client.query(`
                SELECT * FROM products;
            `);

            return Promise.resolve(products.rows);
        } catch (e) {
            console.log(e)
            Promise.reject(e)
        }
    }

    async getOne(productId) {
        try {
            await client.connect();
                   
            const products = await client.query(`
                SELECT * FROM products
                WHERE id = '${productId}'::uuid
            `);

            return Promise.resolve(products.rows[0]);
        } catch (e) {
            console.log(e)
            Promise.reject(e)
        }
    }
}

export default new ProductsService();
