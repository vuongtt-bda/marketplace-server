var fs = require('fs');


const fixFolder = () => {
    const dir1 = './public/json';
    const dir2 = './public/uploads';

    if (!fs.existsSync(dir1)) {
        fs.mkdirSync(dir1, {
            recursive: true
        });
    }

    if (!fs.existsSync(dir2)) {
        fs.mkdirSync(dir2, {
            recursive: true
        });
    }
}


module.exports = {fixFolder};