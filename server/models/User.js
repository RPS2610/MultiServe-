const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    phone:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    role:{
        type:String,
        enum:["customer","provider","admin"],
        default:"customer"
    },

    service:{
        type:String,
        default:""
    },

    city:{
        type:String,
        default:""
    },

    address:{
        type:String,
        default:""
    },

    experience: {
    type: Number,
    default: 0
},

price: {
    type: Number,
    default: 0
},

about: {
    type: String,
    default: ""
},

    profileImage:{
        type:String,
        default:""
    }

},{
    timestamps:true
});

module.exports = mongoose.model("User",userSchema);