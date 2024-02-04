const db = require('../db')

class tourController {
    async createTour (req, res) {
        const {name, start_date, end_date, price, sales_count, group_id} = req.body
        const newTour = await db.query(`INSERT INTO tour (name, start_date, end_date, price, sales_count, group_id)
                                        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
                                        [name, start_date, end_date, price, sales_count, group_id])
        res.json(newTour.rows[0])
    }
    async getToursByBand (req, res) {
        const id = req.params.id
        const tours = await db.query(`SELECT * FROM tour WHERE group_id = $1`, [id])
        res.json(tours.rows)
    }
    async getTour (req, res) {
        const id = req.params.id
        const tour = await db.query(`SELECT * FROM tour WHERE id = $1`, [id])
        res.json(tour.rows[0])
    }
    async updateTour (req, res) {
        const {id, name, start_date, end_date, price, sales_count, group_id} = req.body
        const updatedTour = await db.query(`UPDATE tour SET name = $7, start_date = $2, end_date = $3, price = $4, sales_count = $5, group_id = $6
                                            WHERE id = $1 RETURNING *`,
                                            [id, start_date, end_date, price, sales_count, group_id, name])
        res.json(updatedTour.rows[0])
    }
    async deleteTour (req, res) {
        const id = req.params.id

        const deletedCities = await db.query(`DELETE FROM tour_cityes WHERE tour_id = $1`, [id])
        const deletedTour = await db.query(`DELETE FROM tour WHERE id = $1`, [id])

        console.log(deletedTour.rows[0])
        res.json(deletedTour.rows[0])
    }
    async addCity (req, res) {
        const {tour_id, city_id} = req.body
        const tour_location = await db.query(`INSERT INTO tour_cityes (tour_id, city_id) VALUES ($1, $2) RETURNING *`, [tour_id, city_id])
        console.log(tour_location.rows[0])
        res.json(tour_location.rows[0])
    }
    async removeCity (req, res) {
        const {tour_id, city_id} = req.body
        const removed_location = await db.query(`DELETE FROM tour_cityes WHERE tour_id = $1 AND city_id = $2`, [tour_id, city_id])
        console.log(tour_id, city_id)
        res.json(removed_location.rows[0])
    }
    async removeCitiesByTour (req, res) {
        const tour_id = req.params.id
        const removed_cities = await db.query(`DELETE FROM tour_cityes WHERE tour_id = $1`, [tour_id])
        res.json(removed_cities.rows)
     }
    async getTourCityesByTourId (req, res) {
        const tour_id = req.params.id
        const tour_cityes = await db.query(`SELECT * FROM tour_cityes WHERE tour_id = $1`, [tour_id])
        const cities = []
        for (let i = 0; i < tour_cityes.rows.length; i++) {
            const locality = await db.query(`SELECT * FROM locality WHERE id = $1`, [tour_cityes.rows[i].city_id])
            cities.push(locality.rows[0].name)
        }
        res.json(cities)
    }
    async getFreeCities (req, res) {
        const tour_id = req.params.id
        const notFreeCities = await db.query(`SELECT * from tour_cityes WHERE tour_id = $1`, [tour_id])
        const all_cities = await db.query(`SELECT * from locality`)

        const correct_cities = []
        if (notFreeCities.rows.length === 0) {
            res.json(all_cities.rows)
        } else {
            for (let i = 0; i < all_cities.rows.length; i++) {
                let isCorrect = false
                for (let j = 0; j < notFreeCities.rows.length; j++) {
                    if (notFreeCities.rows[j].city_id === all_cities.rows[i].id) {
                        isCorrect = false
                        break
                    } else {
                        isCorrect = true
                    }
                }
                if (isCorrect) {
                    correct_cities.push(all_cities.rows[i])
                }
            }
            res.json(correct_cities)
        }
    }
}

module.exports = new tourController()