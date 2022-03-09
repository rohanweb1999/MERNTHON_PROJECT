const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    contact: {
        type: Number,
    },
    userName: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    roll: {
        type: String,
    },
    bio: {
        type: String,
    },
    genres: [
        {
            type: String,
        }
    ],
    NFT: [
        {
            title: {
                type: String,
            },
            description: {
                type: String,
            },
            coverImage: {
                type: String,
            },
            audioFile: {
                type: String,
            },
            price: {
                type: String,
            },
            createAt: {
                type: Date,
                default: Date.now
            },
        }
    ],
    password: {
        type: String,
    },
    confirmPassword: {
        type: String,
    },
    profilePhoto: [
        {
            type: String,
        }
    ],

    Tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmPassword = await bcrypt.hash(this.confirmPassword, 10);
    }
    next();
});

//generating token
userSchema.methods.generateAuthToken = async function () {
    try {

        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.Tokens = this.Tokens.concat({ token });

        await this.save();
        return token;
    }
    catch (err) {
        const jwt = require('jsonwebtoken');
        const User = require('../models/userSchema');
        const address = require('../models/userSchema');


        module.exports = Authenticate;
    }
}


//model for users collection
const User = mongoose.model('User', userSchema);


module.exports = User;