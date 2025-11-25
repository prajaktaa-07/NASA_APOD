require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const APODCache = require("./cache");

const app = express();
app.use(cors());

const cache = new APODCache(60 * 60 * 1000); 

async function getAPOD(date) {
    const key = date || "today";

    const cachedValue = cache.get(key);
    if (cachedValue) {
        return cachedValue;
    }

    const response = await axios.get("https://api.nasa.gov/planetary/apod", {
        params: {
            api_key: process.env.NASA_KEY,
            date: date || undefined
        }
    });


    cache.set(key, response.data);

    return response.data;
}

app.get("/", (req, res) => {
    res.send("NASA APOD Backend is running");
});


app.get("/apod/today", async (req, res) => {
    try {
        const result = await getAPOD(null);
        res.json(result);
    } catch (error) {
        const message =
            error.response?.data?.error?.message ||
            "NASA API rate limit reached. Try again later.";

        res.status(500).json({ error: message });
    }
});


app.get("/apod/:date", async (req, res) => {
    try {
        const result = await getAPOD(req.params.date);
        res.json(result);
    } catch (error) {
        const message =
            error.response?.data?.error?.message ||
            "NASA API rate limit reached or invalid date.";

        res.status(500).json({ error: message });
    }
});


app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});
