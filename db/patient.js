const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost:27017/goodhealthDb', {

    useNewUrlParser: true,
    useUnifiedTopology: true
});

const schema = mongoose.Schema;

const UserSchema = new schema({
    username: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,
    },
})



UserSchema.methods.hashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

UserSchema.methods.comparePassword = function(password, hash) {
    return bcrypt.compareSync(password, hash)
}
module.exports = mongoose.model('users', UserSchema, 'users');