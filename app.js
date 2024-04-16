// Task1: initiate app and run server at 3000
const express = require('express');
const morgan = require('morgan');
const PORT = 3000;



const app =express();
app.use(morgan('dev'));



app.listen(PORT,()=>{


  console.log(`listening on port ${PORT}`) 
})

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection 

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://Athul:Athul@cluster0.ynske8l.mongodb.net/employee?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("connected to DB")
})
.catch((err)=>{
    console.log(err)
})

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below
const empmodel= require('./Model/emp')






//TODO: get data from db  using api '/api/employeelist'
app.use(express.json())
app.get('/api/employeelist',async(req,res)=>{
    try{
        const data = await empmodel.find();
        res.send(data);
    }catch (error) {
        console.log(error)
    }
})




//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const data = await empmodel.findById(id);
        if(data){
        
        
        res.send(data);
        }
    }catch (error) {
        console.log(error)
    }
})




//TODO: send data from db using api '/api/employeelist'
app.post('/api/employeelist',async(req,res)=>{
    try{
    
        const data = req.body;
        await empmodel(data).save();
    
        res.send({Message : "Data added"});
    }catch (error) {
        console.log(error)
    }
})



//Request body format:{name:'',location:'',position:'',salary:''}






//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('/api/employeelist/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        await empmodel.findByIdAndDelete(id);
        res.send("data deleted");
    }catch (error) {
        console.log(error)
    }
})






//TODO: Update  a employee data from db by using api '/api/employeelist'
app.put('/api/employeelist',async(req,res)=>{
  const id =req.body._id;
          try {  
        const final=await empmodel.findByIdAndUpdate(id,req.body);
        final.save();
        res.send("data updated")
        }
        catch (error){
            console.log(error);
        }
}
)
//Request body format:{name:'',location:'',position:'',salary:''}


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



