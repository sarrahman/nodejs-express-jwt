import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './routes/index.mjs';

dotenv.config()

try {
    mongoose.connect('mongodb://localhost:27017/nodejs_db')
    const db = mongoose.connection;
    db.on('error', (err) => {
        console.log(err)
    })
    db.once('open', () => console.log('database connected...'))
} catch (error) {
    console.log(error)
}

const app = express()
const port = process.env.PORT || 8080;

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(port, () => console.log(`server is listening on port ${port}...`))