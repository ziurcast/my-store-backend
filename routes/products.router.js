const express = require('express');
const ProductsServices = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createProductScheme,
  updateProductScheme,
  getProductScheme,
} = require('../schemes/product.scheme');
const router = express.Router();
const service = new ProductsServices();

router.get('/', async (_, res, next) => {
  try {
    const products = await service.find();

    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validatorHandler(createProductScheme, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newProduct = await service.create(data);

      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  validatorHandler(getProductScheme, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);

      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getProductScheme, 'params'),
  validatorHandler(updateProductScheme, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const product = await service.update(id, data);

      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getProductScheme, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await service.delete(id);

      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
