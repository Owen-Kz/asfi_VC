const Meeting = document.getElementById("meetingSecret")
const posterDeckMain = document.getElementById("posterDeckListContainer")

fetch(`/getposterdecks/${Meeting.value}`, ()=>{
    method: "GET"
}).then(res => res.json())
.then(data =>{
    const allPosterDecks = JSON.parse(data.PosterDecks)

    if(allPosterDecks.length >0){
        allPosterDecks.forEach(posterDeck =>{
            const posterDeckTitle = posterDeck.poster_deck_title
            const posterDeckLink = posterDeck.poster_deck_id
            const posterDeckOwner = posterDeck.poster_deck_owner 
            const posterDeckDescription = posterDeck.poster_deck_descritiption
            const posterDeckImage = posterDeck.poster_deck_image
            
            
            posterDeckMain.innerHTML += `<a href=https://asfiposterdecks.com/${posterDeckLink}>
			<div class="posterContainer">
				<div class="posterImg">
					<img src="https://asfiposterdecks.com/images/${posterDeckImage}" alt="testdeck" class="posterImage">
				</div>
				<div class="poster-info">
					<h5>${posterDeckTitle}</h5>
					<p>${posterDeckOwner}</p>
					<p>${posterDeckDescription}</p>
				</div>
			</div>
		</a>`;
        })
    }
})