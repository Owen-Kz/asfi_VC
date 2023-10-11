const ChannelsContainer = document.getElementById("channelsContainer")
fetch("/allchannels", ()=>{
    method: "GET"
}).then(res => res.json())
.then(data =>{
    const AllChannelsData = JSON.parse(data.ChannelData)

    if(AllChannelsData.length > 0){
        AllChannelsData.forEach(channel => {
            const ChannelName = channel.channel_secret
            const ChannelTitle = channel.title

            ChannelsContainer.innerHTML += `<li>${ChannelName}, ${ChannelTitle}</li>`
            
        });
    }else{
        ChannelsContainer.innerHTML = `<li>No available Meetings, Create One</li>`
    }
})