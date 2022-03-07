import mongoose from 'mongoose';

const Users = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    refreshToken: {
        type: String
    },
})

export default mongoose.model('Users', Users)