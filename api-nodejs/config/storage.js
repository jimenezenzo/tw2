import Multer from "multer";

const diskStorage = Multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/files')
    },
    filename: function (req, file, callback) {
        const imagen = Date.now()+ '_' +file.originalname.replace(/ /g, "");
        req.body.imagen = imagen
        callback(null, imagen);
    }
})
   
const storage = Multer({ storage: diskStorage })

export default storage;