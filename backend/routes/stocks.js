const express = require('express');
const router = express.Router();
const {
  getStocks,
  getStockById,
  createStock,
  updateStock,
  deleteStock
} = require('../controllers/stockController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getStocks)
  .post(protect, createStock);

router.route('/:id')
  .get(protect, getStockById)
  .put(protect, updateStock)
  .delete(protect, deleteStock);

module.exports = router;
