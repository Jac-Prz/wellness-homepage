// here we can write a bunch of functions that we can reference in our routes files 
// keeps routes file cleaner

const TodoItem = require('../models/todoModel');
const mongoose = require('mongoose');

// get all
const getItems = async (req, res) => {
    const items = await TodoItem.find({}).sort({ createdAt: -1 }) //will sort newest first
    res.status(200).json(items)
}

// get one
const getItem = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) { //mongoose code to check if the id is valid
        return res.status(404).json({ error: "Not a valid ID" });
    }
    const item = await TodoItem.findById(id);
    if (!TodoItem) {
        return res.status(404).json({ error: "No such workout" }); // if we dont return here, it will continue on and fire the rest of the code. 
    }
    res.status(200).json(item); //if no err send the json
}

// create one
const createItem = async (req, res) => {
    
    try {
        const todo = await TodoItem.create(req.body) //this is an asynchronous function so we also change the router.post to by async so we can use await.
        res.status(200).json(todo);
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}
// delete one
const deleteItem = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) { //mongoose code to check if the id is valid
        return res.status(404).json({ error: "Not a valid ID" });
    }

    const item = await TodoItem.findOneAndDelete({ _id: id })

    if (!TodoItem) {
        return res.status(404).json({ error: "Not a valid ID" });
    }

    res.status(200).json(item);
}
// update one

const updateItem = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) { //mongoose code to check if the id is valid
        return res.status(404).json({ error: "Not a valid ID" });
    }

    const item = await TodoItem.findOneAndUpdate({ _id: id }, { ...req.body });

    if (!TodoItem) {
        return res.status(404).json({ error: "No such workout" }); // if we dont return here, it will continue on and fire the rest of the code. 
    }

    res.status(200).json(item);
}


module.exports = {
    getItems,
    getItem,
    createItem,
    deleteItem, 
    updateItem
} 