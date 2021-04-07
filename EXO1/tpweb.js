function meteoAjaxCall(url, methodType, callback) {
    return $.ajax({
        url: url,
        method: methodType,
        dataType: "json"
    })
}
function tradCivilCloudCover(value) {
    switch (value) {
        case "-9999":
            return "Undefined";
        case 1:
            return "0%-6%";
        case 2:
            return "6%-19%";
        case 3:
            return "19%-31%";
        case 4:
            return "31%-44%";
        case 5:
            return "44%-56%";
        case 6:
            return "56%-69%";
        case 7:
            return "69%-81%";
        case 8:
            return "81%-94%";
        case 9:
            return "94%-100%";
    }
}
function tradCivilLiftedIndex(value) {
    switch (value) {
        case "-9999":
            return "Undefined";
        case -10:
            return "Below -7";
        case -6:
            return "-7 to -5";
        case -4:
            return "-5 to -3";
        case -1:
            return "-3 to 0";
        case 2:
            return "0 to 4";
        case 6:
            return "4 to 8";
        case 10:
            return "8 to 11";
        case 15:
            return "Over 11";
    }
}
function tradCivil10mWindDirection(value) {
    switch (value) {
        case "-9999":
            return "Undefined";
        default:
            return value;
    }
}
function tradCivil10mWindSpeed(value) {
    switch (value) {
        case "-9999":
            return "Undefined";
        case 1:
            return "Below 0.3m/s (calm)";
        case 2:
            return "0.3-3.4m/s (light)";
        case 3:
            return "3.4-8.0m/s (moderate)";
        case 4:
            return "8.0-10.8m/s (fresh)";
        case 5:
            return "10.8-17.2m/s (strong)";
        case 6:
            return "17.2-24.5m/s (gale)";
        case 7:
            return "24.5-32.6m/s (storm)";
        case 8:
            return "Over 32.6m/s (hurricane)";
    }
}
function tradCivilPrecipitationType(value) {
    switch (value) {
        case "-9999":
            return "Undefined";
        case "frzr":
            return "freezing rain";
        case "icep":
            return "ice pellets";
        default:
            return value;
    }
}
function tradCivilPrecipitationAmount(value) {
    switch (value) {
        case "-9999":
            return "Undefined";
        case 0:
            return "None";
        case 1:
            return "0-0.25mm/hr";
        case 2:
            return "0.25-1mm/hr";
        case 3:
            return "1-4mm/hr";
        case 4:
            return "4-10mm/hr";
        case 5:
            return "10-16mm/hr";
        case 6:
            return "16-30mm/hr";
        case 7:
            return "30-50mm/hr";
        case 8:
            return "50-75mm/hr";
        case 9:
            return "Over 75mm/hr";
    }
}
function tradCivilWeatherType(value) {
    switch (value) {
        case "-9999":
            return "Undefined";
        case "clearday":
        case "clearnight":
            return "Total cloud cover less than 20%";
        case "pcloudyday":
        case "pcloudynight":
            return "Total cloud cover between 20%-60%";
        case "mcloudyday":
        case "mcloudynight":
            return "Total cloud cover between 60%-80%";
        case "cloudyday":
        case "cloudynight":
            return "Total cloud cover over over 80%";
        case "humidday":
        case "humidnight":
            return "Relative humidity over 90% with total cloud cover less than 60%";
        case "lightrainday":
        case "lightrainnight":
            return "Precipitation rate less than 4mm/hr with total cloud cover more than 80%";
        case "oshowerday":
        case "oshowernight":
            return "Precipitation rate less than 4mm/hr with total cloud cover between 60%-80%";
        case "ishowerday":
        case "ishowernight":
            return "Precipitation rate less than 4mm/hr with total cloud cover less than 60%";
        case "lightsnowday":
        case "lightsnownight":
            return "Precipitation rate less than 4mm/hr";
        case "rainday":
        case "rainnight":
            return "Precipitation rate over 4mm/hr";
        case "snowday":
        case "snownight":
            return "Precipitation rate over 4mm/hr";
        case "rainsnowday":
        case "rainsnownight":
            return "Precipitation type to be ice pellets or freezing rain";
    }
}
// Parse le json en autant de tableaux que de dates :
function parseJsonToMeteo(respJson, type) {
    const init = respJson.init;
    let date, hour, tmp, count = 0;
    let day = parseInt(init.substring(6, 8));
    let month = parseInt(init.substring(4, 6));
    let year = parseInt(init.substring(0, 4));
    date = day < 10 ? "0" + day + "/" : day + "/";
    date += month < 10 ? "0" + month + "/" + year : month + "/" + year;
    $("#display_meteo").append("<div class=\"col-sm-4\"><div id=\"" + date + "\" class=\"well\"><h4>" + date + "</h4></div></div>");
    for (i in respJson.dataseries) {
        tmp = parseInt(init.substring(8)) + respJson.dataseries[i].timepoint;
        hour = tmp % 24;
        if (Math.floor(tmp / 24) > count) {
            count++;
            if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
                day++;
                if (day > 31) {
                    month++;
                    day %= 31;
                    if (month > 12) {
                        year++;
                        month %= 12;
                    }
                }
            } else if ([4, 6, 9, 11].includes(month)) {
                day++;
                if (day > 30) {
                    month++;
                    day %= 30;
                }
            } else if (year % 4 === 0) {
                day++;
                if (day > 29) {
                    month++;
                    day %= 29;
                }
            } else {
                day++;
                if (day > 28) {
                    month++;
                    day %= 28;
                }
            }
            date = day < 10 ? "0" + day + "/" : day + "/";
            date += month < 10 ? "0" + month + "/" + year : month + "/" + year;
            $("#display_meteo").append("<div class=\"col-sm-4\"><div id=\"" + date + "\" class=\"well\"><h4>" + date + "</h4></div></div>");
        }
        document.getElementById(date).innerHTML += "<p><strong>" + (hour < 10 ? " - 0" + hour + "h00 -" : " - " + hour + "h00 -") + "</strong></p>";
        document.getElementById(date).innerHTML += "<p>Cloud Cover : <strong>" + tradCivilCloudCover(respJson.dataseries[i].cloudcover) + "</strong></p>";
        document.getElementById(date).innerHTML += "<p>Lift Index : <strong>" + tradCivilLiftedIndex(respJson.dataseries[i].lifted_index) + "</strong></p>";
        document.getElementById(date).innerHTML += "<p>2m Temperature : <strong>" + respJson.dataseries[i].temp2m + "C" + "</strong></p>";
        document.getElementById(date).innerHTML += "<p>2m Relative Humidity : <strong>" + respJson.dataseries[i].rh2m + "</strong></p>";
        document.getElementById(date).innerHTML += "<p>10m Wind Direction : <strong>" + tradCivil10mWindDirection(respJson.dataseries[i].wind10m.direction) + "</strong></p>";
        document.getElementById(date).innerHTML += "<p>10m Wind Speed : <strong>" + tradCivil10mWindSpeed(respJson.dataseries[i].wind10m.speed) + "</strong></p>";
        document.getElementById(date).innerHTML += "<p>Precipitation Type : <strong>" + tradCivilPrecipitationType(respJson.dataseries[i].prec_type) + "</strong></p>";
        if (type === "civil") {
            document.getElementById(date).innerHTML += "<p>Precipitation Amount : <strong>" + tradCivilPrecipitationAmount(respJson.dataseries[i].prec_amount) + "</strong></p>";
            document.getElementById(date).innerHTML += "<p>Weather Type : <strong>" + tradCivilWeatherType(respJson.dataseries[i].weather) + "</strong></p>";
        }
    }
}
// Parse le json dans un seul tableau adapté à la comparaison gauche-droite :
function parseJsonToCompareMeteo(respJson, id, lon, lat) {
    const init = respJson.init;
    let date, hour, tmp, count = 0;
    let day = parseInt(init.substring(6, 8));
    let month = parseInt(init.substring(4, 6));
    let year = parseInt(init.substring(0, 4));
    date = day < 10 ? "0" + day + "/" : day + "/";
    date += month < 10 ? "0" + month + "/" + year : month + "/" + year;
    $("#display_meteo").append("<div class=\"col-sm-6\"><div id=\"" + id + "\" class=\"well\"><h3>Position [" + lon + " " + lat + "]</h3></div></div>");
    document.getElementById(id).innerHTML += "<p><h4>" + date + "</h4></p>";
    for (i in respJson.dataseries) {
        tmp = parseInt(init.substring(8)) + respJson.dataseries[i].timepoint;
        hour = tmp % 24;
        if (Math.floor(tmp / 24) > count) {
            count++;
            if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
                day++;
                if (day > 31) {
                    month++;
                    day %= 31;
                    if (month > 12) {
                        year++;
                        month %= 12;
                    }
                }
            } else if ([4, 6, 9, 11].includes(month)) {
                day++;
                if (day > 30) {
                    month++;
                    day %= 30;
                }
            } else if (year % 4 === 0) {
                day++;
                if (day > 29) {
                    month++;
                    day %= 29;
                }
            } else {
                day++;
                if (day > 28) {
                    month++;
                    day %= 28;
                }
            }
            date = day < 10 ? "0" + day + "/" : day + "/";
            date += month < 10 ? "0" + month + "/" + year : month + "/" + year;
            document.getElementById(id).innerHTML += "<p><h4>" + date + "</h4></p>";
        }
        document.getElementById(id).innerHTML += "<p><strong>" + (hour < 10 ? " - 0" + hour + "h00 -" : " - " + hour + "h00 -") + "</strong></p>";
        document.getElementById(id).innerHTML += "<p>Cloud Cover : <strong>" + tradCivilCloudCover(respJson.dataseries[i].cloudcover) + "</strong></p>";
        document.getElementById(id).innerHTML += "<p>Lift Index : <strong>" + tradCivilLiftedIndex(respJson.dataseries[i].lifted_index) + "</strong></p>";
        document.getElementById(id).innerHTML += "<p>2m Temperature : <strong>" + respJson.dataseries[i].temp2m + "C" + "</strong></p>";
        document.getElementById(id).innerHTML += "<p>2m Relative Humidity : <strong>" + respJson.dataseries[i].rh2m + "</strong></p>";
        document.getElementById(id).innerHTML += "<p>10m Wind Direction : <strong>" + tradCivil10mWindDirection(respJson.dataseries[i].wind10m.direction) + "</strong></p>";
        document.getElementById(id).innerHTML += "<p>10m Wind Speed : <strong>" + tradCivil10mWindSpeed(respJson.dataseries[i].wind10m.speed) + "</strong></p>";
        document.getElementById(id).innerHTML += "<p>Precipitation Type : <strong>" + tradCivilPrecipitationType(respJson.dataseries[i].prec_type) + "</strong></p>";
    }
}
// Remmet la page à zéro :
function clearPage() {
    $("#display_city div").remove();
    $("#display_meteo div").remove();
    $("#display_distance div").remove();
    document.getElementById("formMeteo").reset();
    document.getElementById("formCompareMeteo").reset();
    $("#position").html("Click on a button below");
}
// La météo sur 3 jours :
function meteoAstro(lon, lat) {
    clearPage();
    $("#position").html("Traitement en cours...");
    let URL = "http://www.7timer.info/bin/api.pl?lon=" + lon + "&lat=" + lat + "&product=astro&output=json";
    meteoAjaxCall(URL, "GET").then(function (respJson) {
        parseJsonToMeteo(respJson, "astro");
        $("#position").html("Longitude : " + lon + " / Latitude : " + lat);
    }, function (reason) {
        console.log("error in processing the request", reason);
        $("#position").html("Meteo at [" + lon + " " + lat + "] is not available");
    });
}
// La météo sur 8 jours :
function meteoCivil(lon, lat) {
    clearPage();
    $("#position").html("Traitement en cours...");
    let URL = "http://www.7timer.info/bin/api.pl?lon=" + lon + "&lat=" + lat + "&product=civil&output=json";
    meteoAjaxCall(URL, "GET").then(function (respJson) {
        parseJsonToMeteo(respJson, "civil");
        $("#position").html("Longitude : " + lon + " / Latitude : " + lat);
    }, function (reason) {
        console.log("error in processing the request", reason);
        $("#position").html("Meteo at [" + lon + " " + lat + "] is not available");
    });
}
// La météo de Paris sur les 8 prochains jours :
function meteoCivilParis() {
    meteoCivil(2.352221, 48.856614);
}
// La météo à la position actuelle de l'utilisateur sur les 8 prochains jours :
function meteoCivilCurrentPosition() {
    $("#position").html("Traitement en cours...");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (pos) {
            meteoCivil(pos.coords.longitude, pos.coords.latitude);
        });
    } else {
        $("#position").html("Geolocation is not supported by this browser.");
    }
}
// La météo sur 3 ou 8 jours à la position renseigné par l'utilisateur :
function meteoForm() {
    let lon = document.getElementById("formMeteo")["longitude"].value;
    let lat = document.getElementById("formMeteo")["latitude"].value;
    if (document.getElementById("formMeteo")["duration"].value === "3") {
        meteoAstro(lon, lat);
    } else if (document.getElementById("formMeteo")["duration"].value === "8") {
        meteoCivil(lon, lat);
    }
    let URL = "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + lat + "&lon=" + lon + "&zoom=10";
    meteoAjaxCall(URL, "GET").then(function (respJson) {
        if (respJson.error != undefined) {
            $("#position").html("City at [" + lon + " " + lat + "] is not available");
            return;
        }
        $("#display_city").append("<div class=\"col-sm-12\"><div id=\"city\" class=\"well\"><h3>" + respJson.display_name + "</h3></div></div>");
    }, function (reason) {
        console.log("error in processing the request", reason);
    });
}
// Calcule la distance entre deux positions renseignées par l'utilisateur :
function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    } else {
        let radlat1 = Math.PI * lat1 / 180;
        let radlat2 = Math.PI * lat2 / 180;
        let theta = lon1 - lon2;
        let radtheta = Math.PI * theta / 180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) +
            Math.cos(radlat1) * Math.cos(radlat2) *
            Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        return dist;
    }
}
// Comparaison entre les météos sur 3 jours de deux positions renseignées par l'utilisateur :
function meteoCompareForm() {
    let lon1 = document.getElementById("formCompareMeteo")["longitude1"].value;
    let lat1 = document.getElementById("formCompareMeteo")["latitude1"].value;
    let lon2 = document.getElementById("formCompareMeteo")["longitude2"].value;
    let lat2 = document.getElementById("formCompareMeteo")["latitude2"].value;
    let unit = document.getElementById("formCompareMeteo")["unit"].value;
    let URL1 = "http://www.7timer.info/bin/api.pl?lon=" + lon1 + "&lat=" + lat1 + "&product=astro&output=json";
    let URL2 = "http://www.7timer.info/bin/api.pl?lon=" + lon2 + "&lat=" + lat2 + "&product=astro&output=json";
    let URL3 = "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + lat1 + "&lon=" + lon1 + "&zoom=10";
    let URL4 = "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + lat2 + "&lon=" + lon2 + "&zoom=10";
    clearPage();
    $("#position").html("Traitement en cours...");
    meteoAjaxCall(URL1, "GET").then(function (respJson) {
        parseJsonToCompareMeteo(respJson, "position1", lon1, lat1);
        meteoAjaxCall(URL2, "GET").then(function (respJson) {
            parseJsonToCompareMeteo(respJson, "position2", lon2, lat2);
            $("#display_distance").append("<div class=\"col-sm-12\"><div id=\"distance\" class=\"well\"><h3>Distance between [" + lon1 + " " + lat1 + "] and [" + lon2 + " " + lat2 + "] is : " + distance(lat1, lon1, lat2, lon2, unit) + "</h3></div></div>");
            $("#position").html("Comparing meteo");
        }, function (reason) {
            console.log("error URL2 in processing the request", reason);
            $("#position").html("Meteo at [" + lon2 + " " + lat2 + "] is not available");
        });
    }, function (reason) {
        console.log("error URL1 in processing the request", reason);
        $("#position").html("Meteo at [" + lon1 + " " + lat1 + "] is not available");
    });
    meteoAjaxCall(URL3, "GET").then(function (respJson) {
        if (respJson.error != undefined) {
            $("#position").html("City at [" + lon1 + " " + lat1 + "] is not available");
            return;
        }
        $("#display_city").append("<div class=\"col-sm-6\"><div id=\"city1\" class=\"well\"><h3>" + respJson.display_name + "</h3></div></div>");
    }, function (reason) {
        console.log("error in processing the request", reason);
    });
    meteoAjaxCall(URL4, "GET").then(function (respJson) {
        if (respJson.error != undefined) {
            $("#position").html("City at [" + lon2 + " " + lat2 + "] is not available");
            return;
        }
        $("#display_city").append("<div class=\"col-sm-6\"><div id=\"city2\" class=\"well\"><h3>" + respJson.display_name + "</h3></div></div>");
    }, function (reason) {
        console.log("error in processing the request", reason);
    });
}

/* *** */

function mealAjaxCall(url, methodType, callback) {
    return $.ajax({
        url: url,
        method: methodType,
        dataType: "json"
    })
}

function parseJsonToHTML() {
    // TODO
}

// La météo sur 3 jours :
function mealForm() {
    clearPage();
    $("#position").html("Traitement en cours...");
    // TODO
    let text = document.getElementById("formMeal")["text"].value;
    let URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + text;
    mealAjaxCall(URL, "GET").then(function (respJson) {
        // TODO
    }, function (reason) {
        console.log("error in processing the request", reason);
        // TODO
    });
}