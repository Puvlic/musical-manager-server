const Router = require('express')
const router = new Router()
const musiciansController = require('../controllers/musiciansController')

router.post('/musician/create', musiciansController.createMusician)
router.get('/musician/get_all', musiciansController.getMusicians)
router.get('/musician/get_one/:id', musiciansController.getOneMusician)
router.get('/musician/get_free', musiciansController.getFreeMusicians)
router.put('/musician/update', musiciansController.updateMusician)
router.put('/musician/set_band', musiciansController.setBand)
router.delete('/musician/delete/:id', musiciansController.deleteMusician)

router.delete('/band_members/delete/:id', musiciansController.removeMusicianFromBandMembersById)
router.put('/musician/remove_band_id/:id', musiciansController.removeBandId)

module.exports = router