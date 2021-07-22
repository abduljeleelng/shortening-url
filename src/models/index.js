const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
    urlCode:{
        type:String,
        trim:true,
        require:true,
    },
    longUrl:{
        type:String,
        trim:true,
        require:true,
    },
    shortUrl:{
        type:String,
        trim:true,
        require:true,

    },
    count:{
        type:Number,
        default:0
    },
    visitor:[{
        date:Date,
        click:{
            type:Number,
            default:0,
        },
        ip:String,
    }],
    created_at:Date,
    updated_at:Date,
});

module.exports = mongoose.model('Url', urlSchema);