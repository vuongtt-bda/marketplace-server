const express = require('express');
const Router = express.Router();
const {uploadInfoNFT, postFileNFT, getNFTbyTokenId} = require('../controllers/NftController');
const {upload} = require('../middlewares/uploadImage');

Router.route('/createNFT').post(upload.single('fileNFT'),postFileNFT);  
Router.route('/uploadInfoNFT').post(uploadInfoNFT);
Router.route('/:tokenId').get(getNFTbyTokenId);

module.exports = Router;