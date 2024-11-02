const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://elow9020:VUUTX35XxO097PkK@cluster0.6louf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Connect to Mongodb succesfuly');
    } catch (error) {
        console.log('Connect failed');
    }
}

module.exports = connectDB