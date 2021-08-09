require('dotenv').config();
const PORT = process.env.PORT || 3000;
const DOMAIN = process.env.DOMAIN || 'http://localhost';
const fs = require('fs');
const path = require('path');
const CID = require('cids');
const multihashing = require('multihashing-async');
const { json } = require('express');

exports.postFileNFT = async (req, res, next) => {
    try {
        let uri = DOMAIN + ':' + PORT+ '/static/uploads/' + req.file.filename;
        res.status(200).json({
            uri
        })
    } catch (error) {
       res.json(error) 
    }
}
exports.uploadInfoNFT = async (req, res, next) => {
    try {
        let tokenId = await createCID(req.body);
        let uriJson = `${DOMAIN +':'+ PORT}/static/json/${tokenId}.json`;
        
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
                },
                lastModified: {
                    type: "string",
                    description: body.lastModified
                },
                lastModifiedDate: {
                    type: "string",
                    description: body.lastModifiedDate
                }
            }
        }
        const metadata = JSON.stringify(data);
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
}