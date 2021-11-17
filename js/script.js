for(var i = 9; i < 18; i++){
    $(`#row-${[i]} .description`).val(localStorage.getItem(`row-${[i]}`))
}

$("#currentDay").text(moment().format("dddd, MMMM Do"))




$("#searchBtn").on("click", function(){
    var searchVal = $("#cityInput").val()

    getCurrentWeather(searchVal)
})

function getCurrentWeather(searchVal) {
console.log("SERACH VAL IN GETCURRENT WEATHER", searchVal)
// youll call your api and input the searchVal into the queryURL
}