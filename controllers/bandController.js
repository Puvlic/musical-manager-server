const db = require('../db')

class bandController {
    async createBand (req, res) {
        const {name, year_of_formation, country, hit_parade_position} = req.body
        const newBand = await db.query(`INSERT INTO band (name, year_of_formation, country, hit_parade_position) 
                                VALUES ($1, $2, $3, $4) RETURNING *`,
                                [name, year_of_formation, country, hit_parade_position])
        res.json(newBand.rows[0])
    }
    async getBands (req, res) {
        const bands = await db.query(`SELECT * FROM band`)
        res.json(bands.rows)
    }
    async getOneBand (req, res) {
        const id = req.params.id
        const band = await db.query(`SELECT * FROM band WHERE id = $1`, [id])
        res.json(band.rows[0])
    }
    async updateBand (req, res) {
        const {id, name, year_of_formation, country, hit_parade_position} = req.body
        const updatedBand = await db.query(`UPDATE band SET name = $2, year_of_formation = $3, country = $4, hit_parade_position = $5 
                                      WHERE id = $1 RETURNING *`,
                                      [id, name, year_of_formation, country, hit_parade_position])
        res.json(updatedBand.rows[0])
    }
    async deleteBand (req, res) {
        const id = req.params.id
        const tours = await db.query(`SELECT FROM tour WHERE group_id = $1`, [id])

        for (let i = 0; i < tours.rows.length; i++) {
            await db.query(`DELETE FROM tour_cityes WHERE tour_id = $1`, [tours.rows[i].id])
        }

        const deletedTours = await db.query(`DELETE FROM tour WHERE group_id = $1`, [id])
        const deletedRepertoire = await db.query(`DELETE FROM repertoire WHERE band_id = $1`, [id])
        await db.query(`UPDATE musician SET band_id = NULL WHERE band_id = $1 RETURNING *`, [id])
        const deletedMembers = await db.query(`DELETE FROM band_members WHERE band_id = $1`, [id])
        const deletedBand = await db.query(`DELETE FROM band WHERE id = $1 RETURNING *`, [id])
        res.json(deletedBand.rows[0])
    }
    async addMusic (req, res) {
        const {band_id, music_id} = req.body
        const addedMusic = await db.query(`INSERT INTO repertoire (band_id, music_id) VALUES ($1, $2) RETURNING *`, [band_id, music_id])
        res.json(addedMusic.rows[0])
    }
    async deleteMusic (req, res) {
        const {band_id, music_id} = req.body
        const deletedMusic = await db.query(`DELETE FROM repertoire WHERE band_id = $1 AND music_id = $2`, [band_id, music_id])
        res.json(deletedMusic.rows[0])
    }
    async getFreeMusics (req, res) {
        const musics = await db.query(`SELECT * FROM music WHERE band_id = -1`)
        res.json(musics.rows)
    }
    async getRepertoire (req, res) {
        const id = req.params.id
        const repertoire = await db.query(`SELECT (SELECT id FROM music WHERE music.id = music_id) as music, 
                                                  (SELECT name FROM music WHERE music.id = music_id) as name,
                                                  (SELECT composer FROM music WHERE music.id = music_id) as composer, 
                                                  (SELECT text_author FROM music WHERE music.id = music_id) as text_author,
                                                  (SELECT date_of_creation FROM music WHERE music.id = music_id) as date_of_creation
                                                  FROM repertoire WHERE band_id = $1`, [id])
        res.json(repertoire.rows)
    }

    async addBandMember (req, res) {
        const {band_id, musician_id} = req.body
        const newMember = await db.query(`INSERT INTO band_members (band_id, musician_id) VALUES ($1, $2) RETURNING *`, [band_id, musician_id])
        res.json(newMember.rows[0])
    }
    async getBandMembers (req, res) {
        const members = await db.query(`SELECT * FROM band_members`)
        res.json(members.rows)
    }
    async getBandMembersById (req, res) {
        const band_id = req.params.id
        const members = await db.query(`SELECT * FROM band_members WHERE band_id = $1`, [band_id])
        res.json(members.rows)
    }
    async getOneBandMembers (req, res) {
        const {band_id, musician_id} = req.body
        const members = await db.query(`SELECT * FROM band_members WHERE band_id = $1 and musician_id = $2`, [band_id, musician_id])
        res.json(members.rows[0])
    }
    async deleteMember (req, res) {
        const {band_id, musician_id} = req.body
        const deletedMember = await db.query(`DELETE FROM band_members WHERE band_id = $1 AND musician_id = $2 RETURNING *`, [band_id, musician_id])
        res.json(deletedMember.rows[0])
    }
}

module.exports = new bandController()