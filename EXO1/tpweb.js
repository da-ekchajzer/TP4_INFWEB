function mealAjaxCall(url, methodType, callback) {
    return $.ajax({
        url: url,
        method: methodType,
        dataType: "json"
    })
}

function parseJsonToHTML(respJson, isPicture) {
    for (let i in respJson.meals) {
        $("#display").append("<div class=\"col-sm-8\"><div id=\"" + respJson.meals[i].idMeal + "\" class=\"well\"><h3>" + respJson.meals[i].strMeal + "</h3></div></div>");
        if (isPicture) {
            $("#display").append("<div class=\"col-sm-4\"><div id=\"" + respJson.meals[i].idMeal + "_preview\" class=\"well\"><img src=\"" + respJson.meals[i].strMealThumb + "/preview\"></div></div>");
        }
    }
}

function mealForm() {
    let param = document.getElementById("formMeal")["param"].value;
    let type = document.getElementById("formMeal")["type"].value;
    let isPicture = document.getElementById("formMeal")["picture"].checked;
    let URL = "https://www.themealdb.com/api/json/v1/1/" + type + "=" + param;
    clearPage();
    $("#position").html("We are looking for your meal...");
    mealAjaxCall(URL, "GET").then(function (respJson) {
        parseJsonToHTML(respJson, isPicture);
        if ($("#display").find("div").length != 0) {
            $("#position").html("Enjoy your meal !");
        } else {
            $("#position").html("Sorry your meal does not exist in the database. Please search antoher one.");
        }
    }, function (reason) {
        console.log("error in processing the request", reason);
        $("#position").html("Error in processing the request. Please check URL and / or API key.");
    });
}

function clearPage() {
    $("#display div").remove();
    document.getElementById("formMeal").reset();
    $("#position").html("What meal do you want ?");
}