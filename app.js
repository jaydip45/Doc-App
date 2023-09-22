const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.urlencoded({extended:true}))

const userRoutes = require('./Routers/UserRoutes')
const roleRoutes = require('./Routers/RoleRoutes') 
const doctorRoutes = require('./Routers/DoctorRoutes')

app.use('/user',userRoutes)
app.use('/role', roleRoutes)
app.use('/doctor',doctorRoutes)

async function connectToDatabase() {
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/DA_node', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Database Connected');
    } catch (error) {
      console.error('Database not Connected:', error);
    }
  }
  
  // Call the connectToDatabase function to establish the connection
  connectToDatabase();

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})