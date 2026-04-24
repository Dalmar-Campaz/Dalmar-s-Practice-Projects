const express = require("express");
const axios = require("axios");
const cors = require("cors");


const app = express();
const PORT = 3000;

app.use(cors());

app.get("/", (req, res) => {
    res.send("backend working");
})

app.get("/songs", async (req, res) => {
    try {
        const artists = ["badbunny", "eminem", "the+weeknd", "drake"];
        let allSongs = [];

        for (let artist of artists) {
            const url = `https://itunes.apple.com/search?term=${artist}&entity=song`;
            const response = await axios.get(url);

            allSongs.push(...response.data.results);
        }
        res.json(allSongs);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al obtener las canciones"
        });
    }
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})