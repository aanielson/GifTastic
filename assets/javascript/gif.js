//when the button is clicked, the query will run
//10 gifs and ratings will appear in the #displayAnimals id
$("button").on("click", function() {
    var animal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
    
    //create AJAX call
    $.ajax ({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        //make variable to store the query data
        var results = response.data;
        //create a for loop that displays the rating and gif for 10 gifs
        //because we set the limit to 10 in the query URL, we don't need to put 9 in the loop
        for (var i = 0; i < results.length; i++) {
            var animalDiv = $("<div>");
            var p = $("<p>");
            $(p).text(results[i].rating);
            var animalImage = $("<img>");
            $(animalImage).attr("src", results[i].images.fixed_height.url);
            $(animalDiv).append(p, animalImage);
            $("#displayAnimal").prepend(animalDiv);
        }
    })
})

//Adding new animal buttons based off of user input
$("#run-search").on("click", function() {
    //on click "search" button, run query and produce "top articles"
    //run an AJAX to get response.data
    $.ajax ({  
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        //store user input in a variable
        var searchTerm = $("#search-term").val();
        //make user input into a new button that displays in the #buttons-display
        var animalButton = $("<button>");
        $(animalButton).text(searchTerm);
        $(animalButton).attr("data-animal", searchTerm);
        $("#buttons-display").append(animalButton);
    })
});