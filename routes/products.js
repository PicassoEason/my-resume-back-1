const router = require("express").Router();
const Product  = require('../models/productModel')
const connection = require("../db");

//express middleware
// router.use(express.json())
// router.use(express.urlencoded({extended:false}))

connection();
//Read product route GET all product
router.get('/products', async(req, res) => {
    try{
        const products=await Product.find({})
        res.status(200).send({ message: products });
    }catch(error){
        console.log(error)
        res.status(500).send({message:error.message})
    }
  })
// Get id product
router.get('/products/:id', async(req, res) => {
    try{
        const {id} =req.params
        const product=await Product.findById(id)
        res.status(200).send(product)
    }catch(error){
        res.status(500).send({message:error.message})
    }
  })


//Create product route
router.post('/products', async(req, res) => {
    try{
        const product=await Product.create(req.body)
        res.status(200).send(product);
    }catch(error){
        res.status(500).send({message:error.message})
    }
  })

//Update data or Edit data
router.put('/products/:id', async(req, res) => {
    try{
        const {id} =req.params
        const product=await Product.findByIdAndUpdate(id,req.body)
        if (!product){
            return res.status(404).send({message:'cannot find any product'})
        }
        const updateProduct=await Product.findById(id)
        res.status(200).send(updateProduct)
    }catch(error){
        res.status(500).send({message:error.message})
    }
  })
  
  //delete a product
  router.delete('/products/:id', async(req, res) => {
      try{
          const {id} =req.params
          const product=await Product.findByIdAndDelete(id,req.body)
          if (!product){
              return res.status(404).send({message:'cannot find any product'})
          }
          res.status(200).send(product)
      }catch(error){
          res.status(500).send({message:error.message})
      }
    })




module.exports = router;
// monogoose.set("strictQuery",false)
// monogoose
// .connect(process.env.DB)
// .then(()=>{
//     console.log('connected to MongoDB')
//     app.listen(port, () => {
//         console.log(`Eason app listening on port ${port}`)
//       })
// }).catch(()=>{
//     console.log(error)
// })