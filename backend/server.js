const express = require('express');
const {spawn} = require('child_process');
const multer = require('multer');
var cors = require("cors");
var bodyParser = require("body-parser");
const path = require('path');
const fs = require('fs');
var mongoose = require("mongoose");
const router = express.Router();//new
mongoose.connect("mongodb://127.0.0.1:27017/FTTServer");

const pediatricianRouter = require('./routes/pediatrician');
const patientRouter = require('./routes/patient'); // new
const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/pediatrician', pediatricianRouter); // Use the pediatrician router** new
app.use('/patient', patientRouter); // Use the pediatrician router** new

// Create a storage object with multer to store the video files in the desired directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './videos';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

//const upload = multer({ storage });
var upload = multer({ storage: storage })// new 
app.post('/upload', upload.single('video'), (req, res) => {
    res.json({ filePath: req.file.path });
});

app.get('/', (req, res) => {
    //const param = 'roseel'; // The parameter to send to the Python script
    let dataToSend = '';

    // spawn new child process to call the python script with the parameter
    const python1 = spawn('python', ['./Emotion_Detection_FER/main.py']);
    
    // collect data from script
    python1.stdout.on('data', (data) => {
        console.log('Pipe data from python script ...');
        dataToSend += data.toString();
    });

    // collect error output from the python script
    python1.stderr.on('data', (data) => {
        console.error(`stderr: ${data.toString()}`);
    });

    // in close event we are sure that stream from child process is closed
    python1.on('close', (code) => {
        console.log(`child process closed with code ${code}`);
        // send data to browser
        // Now call the analyze_emotions script
        res.send(dataToSend || "All good");

    });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
