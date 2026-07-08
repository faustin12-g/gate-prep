require('dotenv').config()

const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    role: String
})


const User = mongoose.model('User', userSchema);

mongoose.connect(process.env.MONGO_URI)
.then( async () => {
    console.log('connected to MongoDB')
    const newUser = await User.create({name: 'testUser', age: 23, role: 'student'})
    console.log(`user ${User.name} created`)
})
.catch(err=> console.log('Connection error:', err))

