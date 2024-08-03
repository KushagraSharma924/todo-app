const express = require('express')
const app = express();
const {CreateTodo,UpdateTodo} = require('../backend/types.js')
const {todo} = require('../backend/db.js')
app.use(express.json())

app.post('/todo',async function(req,res){
    const createPayload = req.body
    const parsePayload = CreateTodo.safeParse(createPayload)
    if(!parsePayload.success){
        res.status(411).json({
            msg : 'You done with the Wrong Inputs'
        })
        return;
    }
    await todo.create({
        title:createPayload.title,
        description: createPayload.description,
        completed: false
    })
    res.json({
        msg:'Todo Created'
    })
});
    

app.get('/todos',async function(req,res){
    const todos = await todo.find({})
    console.log(todos)
    res.json({
        todos
    })
})
app.put('/completed',async function(req,res){
    const UpdatePayload = req.body
    const parsePayload = UpdateTodo.safeParse(UpdatePayload)
    if(!parsePayload.success){
        res.status(411).json({
            msg:'You send The wrong Inputs'
        })
        return;
    }
    await todo.updateOne(
        { _id: req.body.id }, // Use _id to match the document's ID
        { completed: true }   // Set the completed field to true
    );
    res.json({
        msg: 'Todo is set to Completed'
    });
    

})

app.listen(3000);