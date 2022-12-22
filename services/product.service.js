const faker = require('faker');
const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');

class ProductsServices {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    this.products = Array.from(Array(limit).keys()).map(() => ({
      id: faker.datatype.uuid(),
      image: faker.image.imageUrl(),
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      isBlocked: faker.datatype.boolean(),
    }));
  }

  async create(data) {
    const { image, name, price } = data;
    const newProduct = {
      id: faker.datatype.uuid(),
      image,
      name,
      price,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    const query = 'SELECT * FROM tasks';
    const [data] = await sequelize.query(query);

    return data;
  }

  async findOne(id) {
    const product = this.products.find((item) => item.id === id);

    if (!product) {
      throw boom.notFound('Product not found');
    }

    if (product.isBlocked) {
      throw boom.conflict('Product is blocked');
    }

    return product;
  }

  async update(id, data) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    } else {
      this.products[index] = {
        ...this.products[index],
        ...data,
      };
    }

    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1);

    return { id, message: 'Success' };
  }
}

module.exports = ProductsServices;
