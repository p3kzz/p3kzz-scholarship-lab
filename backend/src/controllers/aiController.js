const aiService =
    require("../services/aiService")

exports.health = async (
    req,
    res
) => {

    try {

        const result =
            await aiService.health()

        return res.json(result)

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            message:
                "AI unavailable"
        })
    }
}

