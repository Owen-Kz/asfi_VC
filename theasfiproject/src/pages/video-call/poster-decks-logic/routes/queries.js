const { executeQuery } = require('./dbQueries');

async function CreateTableForPosterDecks(){
    const query = `CREATE TABLE IF NOT EXISTS posterdecks (
        Id SERIAL PRIMARY KEY,
        poster_deck_title VARCHAR(50),
        poster_deck_descritiption VARCHAR(500),
        poster_deck_id TEXT,
        poster_deck_image VARCHAR(100) UNIQUE,
        poster_deck_link VARCHAR(100) UNIQUE,
        poster_deck_owner VARCHAR,
        poster_deck_meeting TEXT
        );`
    return executeQuery(query)
}
async function InsertIntoPosterDecks(req,res){
    const {DeckTitle, DeckId, DeckMeeting, DeckLink, DeckImage, DeckDescription, DeckOwner} = req.body
    const query = (`INSERT INTO posterdecks (
        poster_deck_title,
        poster_deck_descritiption,
        poster_deck_id,
        poster_deck_image,
        poster_deck_link,
        poster_deck_owner,
        poster_deck_meeting
    ) VALUES (
        '${DeckTitle}',
        '${DeckDescription}',
        '${DeckId}',
        '${DeckImage}',
        'https://asfiposterdecks.com/${DeckId}',
        '${DeckOwner}',
        '${DeckMeeting}'
    );`)

    return executeQuery(query)
}
async function RetrievePosterDecksTable(req,res, meetingId){
    const meetingIdMain = req.params.meetingId
    
    const query = `SELECT * FROM posterdecks WHERE poster_deck_meeting = '${meetingIdMain}'`
    return executeQuery(query)
}
async function getAllFromTable() {
  const query = 'SELECT * FROM channels';
  return executeQuery(query);
}







module.exports = {
    CreateTableForPosterDecks,
    InsertIntoPosterDecks,
    RetrievePosterDecksTable,
    getAllFromTable
};
