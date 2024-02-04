const Router = require('express')
const router = new Router()
const tourController = require('../controllers/tourController')

router.post('/tour/create', tourController.createTour)
router.get('/tour/get_by_band/:id', tourController.getToursByBand)
router.get('/tour/get_one/:id', tourController.getTour)
router.put('/tour/update', tourController.updateTour)
router.delete('/tour/delete/:id', tourController.deleteTour)
router.post('/tour/location/add', tourController.addCity)
router.delete('/tour/location/remove', tourController.removeCity)
router.delete('/tour/location/remove/by_tour/:id', tourController.removeCitiesByTour)
router.get('/tour/location/get_by_tour/:id', tourController.getTourCityesByTourId)
router.get('/tour/location/get_free_cities/:id', tourController.getFreeCities)

module.exports = router