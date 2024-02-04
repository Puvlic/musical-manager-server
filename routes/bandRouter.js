const Router = require('express')
const router = new Router()
const bandController = require('../controllers/bandController')

router.post('/band/add', bandController.createBand)
router.post('/band/repertoire/add_music', bandController.addMusic)
router.get('/band/get_all', bandController.getBands)
router.get('/band/repertoire/get_by_band/:id', bandController.getRepertoire)
router.get('/band/get_one/:id', bandController.getOneBand)
router.put('/band/update', bandController.updateBand)
router.delete('/band/delete/:id', bandController.deleteBand)
router.delete('/band/repertoire/delete', bandController.deleteMusic)
router.get('/band/repertoire/free', bandController.getFreeMusics)

router.post('/band/members/add', bandController.addBandMember)
router.get('/band/members/get_all/', bandController.getBandMembers)
router.get('/band/members/get_one', bandController.getOneBandMembers)
router.get('/band/members/get_by_id/:id', bandController.getBandMembersById)
router.delete('/band/members/delete', bandController.deleteMember)

module.exports = router
