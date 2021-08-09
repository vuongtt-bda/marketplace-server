# NFT-Upload-Service

Upload content to server and get back info

## Run project
#### step 1: download dependencies
```
npm install
```
#### step 2: run server
```
npm run start
```

> IF **error: node-fetch** in Node version 14.17.4
> ```
> npm i --save node-fetch
> ```


### API
- [domain:port]/api/nft/createNFT
        +  **input**:    file(**name=fileNFT**)
        +  **output**:   uri of file
            { "uri": "http://domain:port/static/uploads/2021-08-09T03-28-42.162Z-350x350.jpg" }

        +  **method**:   POST

- [domain:port]/api/nft/uploadInfoNft
        +  **input**:    req.body
            {
                "title":           "tiêu đề của sản phẩm nft",
                "name":            "tên sản phẩm nft",
                "desc":            "mô tả cho sản phẩm nft",
                "uri":             "http://localhost:3000/static/uploads/2021-08-09T03-28-42.162Z-350x350.jpg",
                "size":            "5286",
                "type":            "image/png",
                "lastModified":    "1627383738225",
                "lastModifiedDate":"Tue Jul 27 2021 18:02:18 GMT+0700 (Giờ Đông Dương)"
            }
        +  **output**:   json data
            {
                "jsonUri": "http://localhost:3000/static/json/bafybeiajfovjcwncfodl2z63iygjvfhdirzrfpt7dygllbweggn2fndyt4.json",
                "tokenId": "bafybeiajfovjcwncfodl2z63iygjvfhdirzrfpt7dygllbweggn2fndyt4",
                "status": "success"
            }
        +  **method**:   POST    

- [domain:port]/api/nft/:tokenId
        +  **input**:    params :tokenId
        +  **output**:   info of nft
            {
                "title": "tiêu đề của sản phẩm nft",
                "name": "tên sản phẩm nft",
                "desc": "mô tả cho sản phẩm nft",
                "uri": "http://localhost:3000/static/uploads/2021-08-09T03-28-42.162Z-350x350.jpg",
                "size": "5286",
                "type": "image/png",
                "lastModified": "1627383738225",
                "lastModifiedDate": "Tue Jul 27 2021 18:02:18 GMT+0700 (Giờ Đông Dương)"
            }
        +  **method**:   GET
