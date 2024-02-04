const db = require('../db')

class MusiciansController {
    async createMusician (req, res) {
        const {firstname, middlename, lastname, age, role} = req.body
        const newMusician = await db.query(`INSERT INTO musician (firstname, middlename, lastname, age, role) 
                                            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
                                            [firstname, middlename, lastname, age, role])
        res.json(newMusician.rows[0])
    }

    async getMusicians (req,  res) {
        const musicians = await db.query(`SELECT * FROM musician`)
        res.json(musicians.rows)
    }

    async getOneMusician (req, res) {
        const id = req.params.id
        const musician = await db.query(`SELECT * FROM musician WHERE id = $1`, [id])
        res.json(musician.rows[0])
    }

    async updateMusician (req, res) {
        const {id, firstname, middlename, lastname, age, role} = req.body
        const updatedMusician = await db.query(`UPDATE musician SET firstname = $1, middlename = $2, lastname = $3, age = $4, role = $5
                                                WHERE id = $6 RETURNING *`,
                                                [firstname, middlename, lastname, age, role, id])
        res.json(updatedMusician.rows[0])
    }

    async deleteMusician (req, res) {
        const id = req.params.id
        const deletedMusician = await db.query(`DELETE FROM musician WHERE id = $1`, [id])
        res.json(deletedMusician.rows[0])
    }

    async setBand (req, res) {
        const {band_id, musician_id} = req.body
        const updatedMusician = await db.query(`UPDATE musician SET band_id = $1 WHERE id = $2 RETURNING *`, [band_id, musician_id])
        res.json(updatedMusician.rows[0])
    }

    async getFreeMusicians (req, res) {
        const musicians = await db.query(`SELECT * FROM musician WHERE band_id IS NULL`)
        res.json(musicians.rows)
    }

    async removeBandId (req, res) {
        const music_id = req.params.id
        const music = await db.query(`UPDATE musician SET band_id = NULL WHERE id = $1`, [music_id])
        res.json(music.rows[0])
    }

    async removeMusicianFromBandMembersById (req, res) {
        const music_id = req.params.id
        await db.query(`UPDATE band_members SET band_id = NULL WHERE musician_id = $1 RETURNING *`, [music_id])
        const music = await db.query(`DELETE FROM band_members WHERE musician_id = $1`, [music_id])
        res.json(music.rows[0])
    }
}

module.exports = new MusiciansController()