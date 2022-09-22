// here we can write a bunch of functions that we can reference in our routes files 
// keeps routes file cleaner

const CalendarDay = require('../models/calendarModel');
const mongoose = require('mongoose');

// get all
const getItems = async (req, res) => {
    const items = await CalendarDay.find({}).sort({ date: -1 }) //will sort newest first
    res.status(200).json(items)
}

// get one
const getItem = async (req, res) => {
    const { id } = req.params;

   const item = await CalendarDay.findOne({date: id});
    if (!CalendarDay) {
        return res.status(404).json({ error: "No such item" }); // if we dont return here, it will continue on and fire the rest of the code. 
    }
    res.status(200).json(item); //if no err send the json
}

// create one
const createItem = async (req, res) => {
    console.log(req.body)
    try {
        const todo = await CalendarDay.create(req.body) //this is an asynchronous function so we also change the router.post to by async so we can use await.
        res.status(200).json(todo);
    } catch (err) {
        res.status(400).json({ error: err.message })
        console.log(err);
    }
}
// delete one
const deleteItem = async (req, res) => {
    const { id } = req.params;
    const item = await CalendarDay.findOneAndDelete({ date: id })
    if (!CalendarDay) {
        return res.status(404).json({ error: "No such item" }); // if we dont return here, it will continue on and fire the rest of the code. 
    }
    res.status(200).json(item);
}
// update one

const updateItem = async (req, res) => {
    const { date } = req.params;

    const item = await CalendarDay.findOneAndUpdate({ date: date }, { ...req.body });
    console.log(req.body);
 
    if (!CalendarDay) {
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