require('dotenv').config()
const express = require('express');
const todoRoutes = require('./routes/todo-list');
const calendarRoutes = require('./routes/calendar');
const weather = require('./routes/weather');
const mongoose = require('mongoose');
const path = require("path");

const app = express();

// middleware
app.use(express.json()); 

app.use((req, res, next) => { 
    console.log(req.path, req.method)
    next() 
});

//routes 
app.use('/api/todo', todoRoutes);
app.use('/api/calendar', calendarRoutes);
app.use(weather);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.send(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .catch(error => handleError(error));


app.listen(process.env.PORT, (req, res) => {
    console.log(`connected to DB &  listening on port ${process.env.PORT}`);
})