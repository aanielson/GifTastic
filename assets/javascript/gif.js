//when the button is clicked, the query will run
//10 gifs and ratings will appear in the #displayAnimals id
var results = [];
function setupSearches() {
    $("button").on("click", function (e) {
        e.preventDefault()
        var animal = null
        if ($(this).attr("id") == "run-search") {
            animal = $("#search-term").val();
            if (!animal) {
                return;
            }
            // prepend new button
            //make user input into a new button that displays in the #buttons-display
            var animalButton = $("<button>");
            $(animalButton).text(animal);
            $(animalButton).attr("data-animal", animal);
            $("#buttons-display").append(animalButton);
            // rebind searches
            setupSearches()
        } else
            animal = $(this).attr("data-animal");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

        //create AJAX call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            //make variable to store the query data
            result = response.data
            //create a for loop that displays the rating and gif for 10 gifs
            //because we set the limit to 10 in the query URL, we don't need to put 9 in the loop
            for (var i = 0; i < result.length; i++) {
                var animalDiv = $("<div>");
                $(animalDiv).attr("class", "animalDiv")
                var p = $("<p>");
                $(p).text("Rated: " + result[i].rating);

                // var ob = []
                // var ob = {
                //     firstname: "pizza"
                // }
                // ob.firstname
                // var num = 0.0;
                // var pizza = ""
                // var test = false;
                // typeof ob == "object"
                // document.compatMode

                var animalImage = $("<img>");
                //still need to find still url vs. moving url
                //original display should be moving
                $(animalImage).attr("src", result[i].images.fixed_height.url)
                $(animalImage).attr("status", "moving").attr("id", result[i].id);
                $(animalDiv).append(p, animalImage);
                $("#displayAnimal").prepend(animalDiv);
            }

            results = results.concat(result)

            //add code to pause and start the gifs
            $("img").on("click", function (e) {
                var index = results.findIndex(r => r.id == e.target.id)
                if (index != -1) {
                    console.log(e);
                    console.log(this);
                    console.log($(this).attr("status"))

                    //if not moving, make it move
                    if ($(this).attr("status") == "still") {
                        $(this).attr("src", results[index].images.fixed_height.url)
                        $(this).attr("status", "moving");
                    }
                    //if moving, make it pause
                    else if ($(this).attr("status") == "moving") {
                        $(this).attr("src", results[index].images.fixed_height_still.url)
                        $(this).attr("status", "still");
                    }
                }
            })
        }, function (error) {
            console.log("bad search")
            console.log(error)
        })
    })
};

setupSearches()