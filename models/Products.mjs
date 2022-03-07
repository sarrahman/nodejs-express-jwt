import mongoose from 'mongoose';

const Products = mongoose.Schema({
    nama: {
        type: String
    },
    brand: {
        type: String
    },
    harga: {
        type: Number
    },
    gudang: {
        type: String
    },
    kategori: {
        type: String
    },
})

export default mongoose.model('Products', Products)