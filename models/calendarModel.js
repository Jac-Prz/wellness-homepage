const mongoose = require('mongoose');

const Schema = mongoose.Schema;

 const calendarSchema = new Schema({
    date: {type: String, 
        required: true
    },
    completedTasks: [String], 
    secondsWorked: Number, 
    dailyWellness: {
        meditate: Boolean, 
        move: Boolean, 
        sleep: Boolean, 
        water: Boolean
    }, 
    gratitude: {
        item1: String, 
        item2: String,
        item3: String
    }, 
    breakExercises: [String], 
    continueTimer: Boolean
    },{retainKeyOrder: true, timestamps: true });

    module.exports= mongoose.model('CalendarDay', calendarSchema);
