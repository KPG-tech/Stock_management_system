const Stock = require('../models/Stock');

// @desc    Get all stocks
// @route   GET /api/stocks
// @access  Private
const getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find({ user: req.user._id });
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single stock
// @route   GET /api/stocks/:id
// @access  Private
const getStockById = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    
    if (stock && stock.user.toString() === req.user._id.toString()) {
      res.json(stock);
    } else {
      res.status(404).json({ message: 'Stock not found or not authorized' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a stock
// @route   POST /api/stocks
// @access  Private
const createStock = async (req, res) => {
  const { name, quantity, price, supplier, description } = req.body;

  try {
    const stock = new Stock({
      name,
      quantity,
      price,
      supplier,
      description,
      user: req.user._id
    });

    const createdStock = await stock.save();
    res.status(201).json(createdStock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a stock
// @route   PUT /api/stocks/:id
// @access  Private
const updateStock = async (req, res) => {
  const { name, quantity, price, supplier, description } = req.body;

  try {
    const stock = await Stock.findById(req.params.id);

    if (stock && stock.user.toString() === req.user._id.toString()) {
      stock.name = name || stock.name;
      stock.quantity = quantity !== undefined ? quantity : stock.quantity;
      stock.price = price !== undefined ? price : stock.price;
      stock.supplier = supplier || stock.supplier;
      stock.description = description || stock.description;

      const updatedStock = await stock.save();
      res.json(updatedStock);
    } else {
      res.status(404).json({ message: 'Stock not found or not authorized' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a stock
// @route   DELETE /api/stocks/:id
// @access  Private
const deleteStock = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);

    if (stock && stock.user.toString() === req.user._id.toString()) {
      await stock.deleteOne();
      res.json({ message: 'Stock removed' });
    } else {
      res.status(404).json({ message: 'Stock not found or not authorized' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStocks,
  getStockById,
  createStock,
  updateStock,
  deleteStock
};
