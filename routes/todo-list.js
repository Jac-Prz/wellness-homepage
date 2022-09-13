const express = require('express');
const router = express.Router();
const {
    getItems,
    getItem,
    createItem, 
    deleteItem, 
    updateItem
} = require('../controllers/todoControllers');


//GET all documents
router.get('/', getItems);

//GET a single document
router.get('/:id', getItem);

//POST a document
router.post('/', createItem);

//DELETE a document
router.delete('/:id', deleteItem);

//UPDATE a document
router.patch('/:id', updateItem);

module.exports = router