const axios = require("axios")

const aiApi = axios.create({
    baseURL: process.env.AI_API_URL,
    timeout: 30000,
})

exports.health = async () => {

    const { data } =
        await aiApi.get("/health")

    return data
}

exports.recommend = async (
    payload,
    k = 5
) => {

    const { data } =
        await aiApi.post(

            `/recommend?k=${k}`,

            payload
        )

    return data
}