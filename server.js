require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
const path = require('path')
const rfs = require('rotating-file-stream')
const serveStatic = require('serve-static');

const {fixFolder} = require('./config/fixFolder');
fixFolder();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use('/static', serveStatic(path.join(__dirname, 'public')));

const accessLogStream = rfs.createStream('access.log', { // create a rotating write stream
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
  })
app.use(morgan('combined', { stream: accessLogStream }))

const nftRoute = require('./routes/NftRoute');

app.use('/api/nft', nftRoute);
app.use('*', (req, res) => {
    return res.status(404).json({
        message: "api not found"
    })
})
app.listen(PORT, ()=>{
    console.log(`app listening at  ${PORT}`);
});