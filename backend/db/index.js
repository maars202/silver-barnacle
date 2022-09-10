const mongoose = require('mongoose')

mongoose
    // .connect('mongodb://127.0.0.1:27017/cinema', { useNewUrlParser: true })
    .connect('mongodb+srv://maars:ZZRifVvUxVSmM6TP@cluster0.u1r22.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
    // mongoose.connect('mongodb://maars:ZZRifVvUxVSmM6TP@cluster0.u1r22.mongodb.net/database?retryWrites=true&w=majority', { useNewUrlParser: true });
    // ZZRifVvUxVSmM6TP
    // mongodb+srv://maars:ZZRifVvUxVSmM6TP@cluster0.u1r22.mongodb.net/?retryWrites=true&w=majority
    // mongodb+srv://<username>:<password>@cluster0.u1r22.mongodb.net/?retryWrites=true&w=majority
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db