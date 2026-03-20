var express = require('express');
var router = express.Router();
let inventorySchema = require('../schemas/inventories');

// GET all
router.get('/', async function (req, res, next) {
  try {
    let data = await inventorySchema.find({}).populate('product');
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET inventory by ID
router.get('/:id', async function (req, res, next) {
  try {
    let result = await inventorySchema.findById(req.params.id).populate('product');
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send({ message: "ID NOT FOUND" });
    }
  } catch (error) {
    res.status(404).send({ message: "ID NOT FOUND" });
  }
});

// POST add_stock
router.post('/add_stock', async function (req, res, next) {
  try {
    let { product, quantity } = req.body;
    let inventory = await inventorySchema.findOne({ product: product });
    if (!inventory) return res.status(404).send({ message: "Inventory not found for product" });

    inventory.stock += parseInt(quantity);
    await inventory.save();
    res.status(200).send(inventory);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// POST remove_stock
router.post('/remove_stock', async function (req, res, next) {
  try {
    let { product, quantity } = req.body;
    let inventory = await inventorySchema.findOne({ product: product });
    if (!inventory) return res.status(404).send({ message: "Inventory not found for product" });

    if (inventory.stock < parseInt(quantity)) {
        return res.status(400).send({ message: "Not enough stock" });
    }
    inventory.stock -= parseInt(quantity);
    await inventory.save();
    res.status(200).send(inventory);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// POST reservation
router.post('/reservation', async function (req, res, next) {
  try {
    let { product, quantity } = req.body;
    let inventory = await inventorySchema.findOne({ product: product });
    if (!inventory) return res.status(404).send({ message: "Inventory not found for product" });

    if (inventory.stock < parseInt(quantity)) {
        return res.status(400).send({ message: "Not enough stock to reserve" });
    }
    inventory.stock -= parseInt(quantity);
    inventory.reserved += parseInt(quantity);
    await inventory.save();
    res.status(200).send(inventory);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// POST sold
router.post('/sold', async function (req, res, next) {
  try {
    let { product, quantity } = req.body;
    let inventory = await inventorySchema.findOne({ product: product });
    if (!inventory) return res.status(404).send({ message: "Inventory not found for product" });

    if (inventory.reserved < parseInt(quantity)) {
        return res.status(400).send({ message: "Not enough reserved quantity to sell" });
    }
    inventory.reserved -= parseInt(quantity);
    inventory.soldCount += parseInt(quantity);
    await inventory.save();
    res.status(200).send(inventory);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
