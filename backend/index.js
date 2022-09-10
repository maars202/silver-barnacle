// const express = require('express')
// const bodyParser = require('body-parser')
// const cors = require('cors')

// const db = require('./db')

// const app = express()
// const apiPort = 3000

// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cors())
// app.use(bodyParser.json())

// db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const movieRouter = require('./routes/movie-router')
var imgModel = require('./models/image-model');

const app = express()
const apiPort = 3000

// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(bodyParser.json())
// Set EJS as templating engine 
app.set("view engine", "ejs");


// Step 5 - set up multer for storing uploaded files
  
var multer = require('multer');
var fs = require('fs');
var path = require('path');
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage });

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/hello', (req, res) => {
    res.send('Hello World!')
})

// Step 7 - the GET request handler that provides the HTML UI
  
app.get('/', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            // res.render('imagesPage', { items: items });
            res.send({ items: items })
        }
    });
});

// Step 8 - the POST handler for processing the uploaded file
  
app.post('/', upload.single('image'), (req, res, next) => {
    console.log("req.file: ", req.image)
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        // img: req.image
        img: {
            // req.file.filename
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.image)),
            contentType: 'image/png'
        }
    }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/');
        }
    });
});

app.use('/api', movieRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))