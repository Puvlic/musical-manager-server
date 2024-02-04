const db = require('../db')

class localityController {
    async createLocality (req, res) {
        const {name} = req.body
        const newLocality = await db.query(`INSERT INTO locality (name) VALUES ($1) RETURNING *`, [name])
        res.json(newLocality.rows[0])
    }
    async getLocalityes (req, res) {
        const localityes = await db.query(`SELECT * FROM locality`)
        res.json(localityes.rows)
    }
    async getOneLocality (req, res) {
        const id = req.params.id
        const locality = await db.query(`SELECT * FROM locality WHERE id = $1`, [id])
        res.json(locality.rows[0])
    }
    async updateLocality (req, res) {
        const {id, name} = req.body
        const updatedLocality = await db.query(`UPDATE locality SET name = $2 WHERE id = $1 RETURNING *`,
            [id, name])
        res.json(updatedLocality.rows[0])
    }
    async deleteLocality (req, res) {
        const id = req.params.id
        const deletedLocality = await db.query(`DELETE FROM locality WHERE id = $1 RETURNING *`, [id])
        res.json(deletedLocality.rows[0])
    }
}

module.exports = new localityController()