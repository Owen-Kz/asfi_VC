const { InsertIntoPosterDecks } = require("../routes/queries");

async function CreateDeck(req,res){
    try {

        const TableData  = await InsertIntoPosterDecks(req,res)
        res.render("deckCreated")
    } catch (error) {
        console.error("Error", error.message)
    }
}

module.exports = CreateDeck