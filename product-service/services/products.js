import { pool } from '../db/pool';

class ProductsService {
    constructor() {
        this.pool = pool;
        this.logger = console;
    }

    async getList() {
        const client = await this.pool.connect();
        try {
            const products = await client.query(`
                SELECT
                    p.id,
                    p.title,
                    p.description,
                    p.price,
                    s.count
                FROM products p
                INNER JOIN stocks s
                ON s.product_id = p.id
            `);

            return Promise.resolve(products.rows);
        } catch (e) {
            this.logger.error(e);

            throw e;
        } finally {
            client.release();
        }
    }

    async getOne(productId) {
        const client = await this.pool.connect();
        try {
            const products = await client.query(`
                SELECT
                    p.id,
                    p.title,
                    p.description,
                    p.price,
                    s.count
                FROM products p
                INNER JOIN stocks s
                ON s.product_id = p.id
                WHERE p.id = $1::uuid
            `, [productId]);

            return Promise.resolve(products.rows[0]);
        } catch (e) {
            this.logger.error(e);

            throw e;
        } finally {
            client.release();
        }
    }

    async create({
        count, price, title, description,
    }) {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            const product = await client.query(
                `
                INSERT INTO products VALUES(gen_random_uuid(), $1, $2, $3) RETURNING *`,
                [title, description, price],
            );
            const stock = await client.query(
                'INSERT INTO stocks VALUES($1, $2) RETURNING *',
                [product.rows[0].id, count],
            );
            await client.query('COMMIT');

            return {
                ...product.rows[0],
                count: stock.rows[0].count,
            };
        } catch (e) {
            await client.query('ROLLBACK');
            this.logger.error(e);

            throw e;
        } finally {
            client.release();
        }
    }
}

export default new ProductsService();
