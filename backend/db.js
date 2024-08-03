const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://kush090605:y5nsS29QUQ0FNpi8@cluster0.wohixap.mongodb.net/?authMechanism=DEFAULT')

const TodoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo = mongoose.model('todos',TodoSchema)

module.exports = {
    todo
}