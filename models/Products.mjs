import mongoose from 'mongoose';

const Products = mongoose.Schema({
    nama: {
        type: String
    },
    harga: {
        type: Number
    }
})

export default mongoose.model('Products', Products)