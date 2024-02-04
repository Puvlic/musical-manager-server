const Router = require('express')
const router = new Router()
const localityController = require('../controllers/localityController')

router.post('/locality/create', localityController.createLocality)
router.get('/locality/get_all', localityController.getLocalityes)
router.get('/locality/get_one/:id', localityController.getOneLocality)
router.put('/locality/update', localityController.updateLocality)
router.delete('/locality/delete/:id', localityController.deleteLocality)

module.exports = router