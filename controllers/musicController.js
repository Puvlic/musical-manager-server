const db = require('../db')

class musicController {
    async createMusic (req, res) {
        const {name, composer, text_author, date_of_creation} = req.body
        const newMusic = await db.query(`INSERT INTO music (name, composer, text_author, date_of_creation, band_id)
                                        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
                                        [name, composer, text_author, date_of_creation, -1])
        res.json(newMusic.rows[0])
    }
    async getMusics (req, res) {
        const musics = await db.query(`SELECT * FROM music`)
        res.json(musics.rows)
    }
    async getOneMusic (req, res) {
        const id = req.params.id
        const music = await db.query(`SELECT * FROM music WHERE id = $1`, [id])
        res.json(music.rows[0])
    }
    async updateMusic (req, res) {
        const {id, name, composer, text_author, date_of_creation} = req.body
        const updatedMusic = await db.query(`UPDATE music SET name = $2, composer = $3, text_author = $4, date_of_creation = $5 
                                            WHERE id = $1 RETURNING *`,
                                            [id, name, composer, text_author, date_of_creation])
        res.json(updatedMusic.rows[0])
    }
    async deleteMusic (req, res) {
        const id = req.params.id
        const deletedMusic = await db.query(`DELETE FROM music WHERE id = $1 RETURNING *`, [id])
        res.json(deletedMusic.rows[0])
    }

    async addMusicInRepertoire (req, res) {
        const {band_id, music_id} = req.body
        const music = await db.query(`INSERT INTO repertoire (band_id, music_id) VALUES ($1, $2) RETURNING *`, [band_id, music_id])
        res.json(music.rows[0])
    }

    async deleteMusicFromRepertoire (req, res) {
        const {band_id, music_id} = req.body
        const music = await db.query(`DELETE FROM repertoire WHERE band_id = $1 AND music_id = $2 RETURNING *`, [band_id, music_id])
        res.json(music.rows[0])
    }

    async getRepertoireByBand (req, res) {
        const band_id = req.params.id
        const music = await db.query(`SELECT music_id FROM repertoire WHERE band_id = $1`, [band_id])
        res.json(music.rows[0])
    }

    async addBandId (req, res) {
        const {band_id, music_id} = req.body
        const music = await db.query(`UPDATE music SET band_id = $1 WHERE id = $2`, [band_id, music_id])
        res.json(music.rows[0])
    }

    async removeBandId (req, res) {
        const music_id = req.params.id
        const music = await db.query(`UPDATE music SET band_id = -1 WHERE id = $1`, [music_id])
        res.json(music.rows[0])
    }

    async removeMusicFromRepertoireById (req, res) {
        const music_id = req.params.id
        const music = await db.query(`DELETE FROM repertoire WHERE music_id = $1`, [music_id])
        res.json(music.rows[0])
    }
}

module.exports = new musicController()