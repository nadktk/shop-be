const productData = require('./products.json');

class ProductsService {
    async getList() {
        return Promise.resolve(productData);
    }

    async getOne(productId) {
        return Promise.resolve(productData.find(({id}) => id === productId));
    }
}

export default new ProductsService();
