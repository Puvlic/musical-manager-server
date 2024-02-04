const Router = require('express')
const router = new Router()
const musicController = require('../controllers/musicController')

router.post('/music/create', musicController.createMusic)
router.get('/music/get_all', musicController.getMusics)
router.get('/music/get_one/:id', musicController.getOneMusic)
router.put('/music/update', musicController.updateMusic)
router.delete('/music/delete/:id', musicController.deleteMusic)

router.post('/repertoire/add', musicController.addMusicInRepertoire)
router.get('/repertoire/get_by_band', musicController.getRepertoireByBand)
router.delete('/repertoire/delete/:id', musicController.deleteMusicFromRepertoire)
router.put('/repertoire/add', musicController.addBandId)
router.put('/repertoire/remove/:id', musicController.removeBandId)
router.delete('/repertoire/remove/by_music_id/:id', musicController.removeMusicFromRepertoireById)

module.exports = router