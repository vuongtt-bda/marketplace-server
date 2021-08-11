require('dotenv').config();
const DOMAIN = process.env.DOMAIN;
const fs = require('fs');
const path = require('path');
const CID = require('cids');
const multihashing = require('multihashing-async');

exports.createNewNFT = async (req, res, next) => {
    try {
        req.body.uri = DOMAIN + '/static/uploads/' + req.file.filename;
        req.body.type = req.file.mimetype;
        req.body.size = req.file.size;

        let tokenId = await createCID(req.body);
        let uriJson = `${DOMAIN}/static/json/${tokenId}.json`;
        
        res.status(200).json({
            jsonUri: uriJson,
            tokenId,
            status: 'success'
        })
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.uploadFileNFT = async (req, res, next) => {
    try {
        // console.log(req.file);
        let uri = DOMAIN + '/static/uploads/' + req.file.filename;
        res.status(200).json({
            uri
        })
    } catch (error) {
       res.json(error) 
    }
}

exports.uploadInfoNFT = async (req, res, next) => {
    try {
        let tokenId = await createCID(req.body.data.info);
        let uriJson = `${DOMAIN}/static/json/${tokenId}.json`;
        
        res.status(200).json({
            jsonUri: uriJson,
            tokenId,
            status: 'success'
        })
    } catch (error) {   
        res.json(error);
    }
}

const createCID = async (body) =>{
    try {
        const data = {
            title:  body.title,
            type:   "object",
            properties: {
                name: {
                    type: "string",
                    description: body.name
                },
                desc: {
                    type: "string",
                    description: body.desc
                },
                image: {
                    type: "string",
                    description: body.uri
                },
                type: {
                    type: "string",
                    description: body.type
                },
                size: {
                    type: "string",
                    description: body.size
                }
            }
        }
                // lastModified: {
                //     type: "string",
                //     description: body.lastModified
                // },
                // lastModifiedDate: {
                //     type: "string",
                //     description: body.lastModifiedDate
                // }
        const metadata = JSON.stringify(data, null, 4);
        const bytes = new TextEncoder('utf8').encode(metadata);
        const hash = await multihashing(bytes, 'sha2-256');
        const cid = new CID(1, 'dag-pb', hash);
        fs.writeFileSync(path.resolve("./public/json", `${cid.toString()}.json`), metadata);
        return cid.toString();
    } catch (error) {
        console.log(error);
    }
}

exports.getNFTbyTokenId = async (req, res, next) => {
    try {
        let tokenId = req.params.tokenId;
        let metadata = await getInfo(tokenId);
        
        res.status(200).json(metadata);
    } catch (error) {
        res.json(error);
    }
}

const getInfo = async (tokenId) => {
    try {
        let rawdata = fs.readFileSync(path.resolve("./public/json",`${tokenId}.json`));
        jsonData = JSON.parse(rawdata);
        let jsonTmp = {
            title:           jsonData.title,
            name:            jsonData.properties.name.description,
            desc:            jsonData.properties.desc.description,
            uri:             jsonData.properties.image.description,
            size:            jsonData.properties.size.description,
            type:            jsonData.properties.type.description,
            lastModified:    jsonData.properties.lastModified.description,
            lastModifiedDate:jsonData.properties.lastModifiedDate.description
        };
        return jsonTmp;
    } catch (error) {
        return {};
    }
}

exports.getMultiNFT = async (req, res) => {
    try {
        let data = await getMultiInfo(req.body.data.arrList);
        res.status(200).json({
            data
        })
    } catch (error) {
        res.status(400).json({
            msg: error.message
        })
    }
}

const getMultiInfo = async (arrList) => {
    try {
        let arrInfo = [];
        for(let i=0; i<arrList.length; i++) {
            let data = await getInfo(arrList[i]);
            arrInfo.push(data)
        }
        return arrInfo;
    } catch (error) {
        return [];
    }
}