const express = require('express')
const app = express()
const port = 3000
const monogoose=require('mongoose')
const Product = require('./models/productModel')
//express middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/messageboard', (req, res) => {
    res.send('Hello messageboard!')
})


//Read product route GET all product
app.get('/products', async(req, res) => {
    try{
        const products=await Product.find({})
        res.status(200).json(products);
    }catch(error){
        console.log(error)
        res.status(500).json({message:error.message})
    }
  })
// Get id product
app.get('/products/:id', async(req, res) => {
    try{
        const {id} =req.params
        const product=await Product.findById(id)
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({message:error.message})
    }
  })


//Create product route
app.post('/products', async(req, res) => {
    try{
        const product=await Product.create(req.body)
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message:error.message})
    }
  })

//Update data or Edit data
app.put('/products/:id', async(req, res) => {
    try{
        const {id} =req.params
        const product=await Product.findByIdAndUpdate(id,req.body)
        if (!product){
            return res.status(404).json({message:'cannot find any product'})
        }
        const updateProduct=await Product.findById(id)
        res.status(200).json(updateProduct)
    }catch(error){
        res.status(500).json({message:error.message})
    }
  })
  
  //delete a product
  app.delete('/products/:id', async(req, res) => {
      try{
          const {id} =req.params
          const product=await Product.findByIdAndDelete(id,req.body)
          if (!product){
              return res.status(404).json({message:'cannot find any product'})
          }
          res.status(200).json(product)
      }catch(error){
          res.status(500).json({message:error.message})
      }
    })
  
monogoose.set("strictQuery",false)
monogoose
.connect('mongodb+srv://Eason:8uMgkZ54JpqCS8Fo@easonresume.nbngzid.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=>{
    console.log('connected to MongoDB')
    app.listen(port, () => {
        console.log(`Eason app listening on port ${port}`)
      })
}).catch(()=>{
    console.log(error)
})