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


## API
- https://nft-node-server.herokuapp.com/api/nft/createNewNFT

> **input**:    
[![form-data: 
    file: fileNFT,
    title: 'text',
    name: 'text',
    desc: 'text'
](https://nft-node-server.herokuapp.com/static/uploads/2021-08-11T13-36-26.401Z-createNewNFT.png)]()
> 
> **output**:   uri of metadata (json file)
>          
> **method**:   POST
   

- [domain:port]/api/nft/:tokenId

> **input**:    params :tokenId
> 
> **output**:   info of nft
> 
>            {
>                "title": "tiêu đề của sản phẩm nft",
>                "name": "tên sản phẩm nft",
>                "desc": "mô tả cho sản phẩm nft",
>                "uri": "https://nft-node-server.herokuapp.com/static/uploads/2021-08-09T03-28-42.162Z-350x350.jpg",
>                "size": "5286",
>                "type": "image/png"
>            }
>            
> **method**:   GET

- [domain:port]/api/nft/getmultinft

> **input**:    req.body.data.arrList
> 
> **output**:   infos of multi nft
>           [
>            {
>                "title": "tiêu đề của sản phẩm nft",
>                "name": "tên sản phẩm nft",
>                "desc": "mô tả cho sản phẩm nft",
>                "uri": "https://nft-node-server.herokuapp.com/static/uploads/2021-08-09T03-28-42.162Z-350x350.jpg",
>                "size": "5286",
>                "type": "image/png"
>            }
>           ]
>            
> **method**:   POST
