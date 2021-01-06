const express = require('express')
const router = express.Router()
const multer = require('multer')

const MemeController = require('../controllers/memes')

const checkAuth = require('../middleware/check-auth')

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './uploads')
    },
    filename: function (req, file, cb){
        cb(null, new Date().toISOString().replace(':',"_").replace(':','_')+file.originalname)
    },
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {fileSize: 2048 * 2048 * 6},
    fileFilter: fileFilter,
})

router.get('/', MemeController.memes_get_all)

router.post('/',checkAuth, upload.single('memeImage'), MemeController.meme_add)

router.get('/:memeId', MemeController.meme_get_one)

router.patch('/:memeId', checkAuth, MemeController.meme_update)

router.delete('/:memeId', checkAuth, MemeController.meme_delete)

module.exports = router