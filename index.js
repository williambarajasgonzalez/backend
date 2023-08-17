const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
require('dotenv').config();
const {emailModel} = require('./models')

mongoose.connect(process.env.MANGO_URL).then(connect=>console.log('Connected Database'))
app.use(cors({origin:true}));
app.use(express.json({
    limit:10000
}))

app.post('/submit',async(req,res)=>{
    const formate = new Date();
    const date = `${formate.getMonth()}/${formate.getDay()}/${formate.getFullYear()}`;
    const time = `${formate.getHours()}:${formate.getMinutes()}`;
    const confirm = await emailModel.create({
        name:req.body.name,
        email:req.body.email,
        message:req.body.message,
        date:date,
        time:time
    })
    if(confirm){
        confirm.save()
        return res.json({success:'success'});
    }
    return res.json({error:"dawdwa"});
})

app.get('/data', async(req,res) =>{
    const data = await emailModel.find({});
    if(data){
        return res.json({success:data});
    }
})

app.post('/id',async(req,res) =>{
    const {id} = req.body;
    const post = await emailModel.findOne({_id:id});
    if(post){
        return res.json({success:post});
    }
    if(!post){
        return res.json({error:'error'});
    }
})

app.post('/delete',async(req,res) =>{
    const remove = await emailModel.findByIdAndDelete(req.body.delete);
    if(remove){
        return res.json({success:'Mensaje eliminado'});
    }
    if(!remove){
        return res.json({error:'error'});
    }
})

app.listen(5000,()=>{
    console.log('Server running');
})