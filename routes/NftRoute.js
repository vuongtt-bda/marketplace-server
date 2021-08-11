const express = require('express');
const Router = express.Router();
const { createNewNFT, uploadInfoNFT, uploadFileNFT, getNFTbyTokenId, getMultiNFT} = require('../controllers/NftController');
const {upload} = require('../middlewares/uploadImage');

// Router.route('/uploadFileNFT').post(upload.single('fileNFT'),uploadFileNFT);  
// Router.route('/uploadInfoNFT').post(uploadInfoNFT);

Router.route('/:tokenId').get(getNFTbyTokenId);
Router.route('/getmultinft').post(getMultiNFT);

Router.route('/createNewNFT').post(upload.single('fileNFT'), createNewNFT);

module.exports = Router;