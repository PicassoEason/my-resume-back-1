const router = require("express").Router();
const Mes  = require('../models/mesboardModel')
const connection = require("../db");
const authenticateJWT=require('./middleware')

connection();

//Read product route GET all product
router.get('/megs', async(req, res) => {
    try{
        const messages=await Mes.find({})
        res.status(200).send({ message: messages });
    }catch(error){
        console.log(error)
        res.status(500).send({message:error.message})
    }
  })
// Get id product
router.get('/megs/:id', async(req, res) => {
    try{
        const {id} =req.params
        const messages=await Mes.findById(id)
        res.status(200).send(messages)
    }catch(error){
        res.status(500).send({message:error.message})
    }
  })


//Create product route
router.post('/megs',authenticateJWT, async(req, res) => {
    try{
        const messages=await Mes.create(req.body)
        res.status(200).send(messages);
    }catch(error){
        res.status(500).send({message:error.message})
    }
  })

//Update data or Edit data
router.put('/megs/:id',authenticateJWT, async(req, res) => {
    try{
        const {id} =req.params
        const messages=await Mes.findByIdAndUpdate(id,req.body)
        if (!messages){
            return res.status(404).send({message:'cannot find any product'})
        }
        const updateMsg=await Mes.findById(id)
        res.status(200).send(updateMsg)
    }catch(error){
        res.status(500).send({message:error.message})
    }
  })
  
  //delete a product
  router.delete('/megs/:id',authenticateJWT, async(req, res) => {
      try{
          const {id} =req.params
          const messages=await Mes.findByIdAndDelete(id,req.body)
          if (!messages){
              return res.status(404).send({message:'cannot find any messages'})
          }
          res.status(200).send(messages)
      }catch(error){
          res.status(500).send({message:error.message})
      }
    })




module.exports = router;
