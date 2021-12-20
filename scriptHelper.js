// Write your helper functions here!
window.addEventListener("load", function() {
    //myFetch()
     this.fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json) {
        //pickPlanet()
         const selectedPlanet = pickPlanet(json);
         //addDestinationInfo()
         addDestinationInfo(
             document,
             selectedPlanet.name,
             selectedPlanet.diameter,
             selectedPlanet.star,
             selectedPlanet.distance,
             selectedPlanet.moons,
             selectedPlanet.image
         );
      });
   });
   formSubmission(document);
   validateInput(testInput);
 });

require('isomorphic-fetch');



function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   /*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src={imageUrl}>
   */
  
    document.getElementById("missionTarget").innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">
    `
}

function validateInput(testInput) {
    if(testInput === "") {
        return "Empty"
    }
    else if(isNaN(testInput)) {
        return "Not A Number"
    }
    else {
        return "Is A Number"
    }
    
}
function formSubmission(document) {
        let form = document.querySelector("form");
        form.addEventListener("submit", function(event) {
            let pilotName = document.querySelector("input[name=pilotName]");
            let copilotName = document.querySelector("input[name=copilotName]");
            let fuelLevel = document.querySelector("input[name=fuelLevel]");
            let cargoLevel = document.querySelector("input[name=cargoMass]");
 
            document.getElementById('launchStatus').innerText = 'Awaiting Information Before Launch';
            document.getElementById('launchStatus').style.color= "black";
            document.getElementById("pilotStatus").innerText = `Pilot ${pilotName.value} is Ready`;
            document.getElementById("copilotStatus").innerText = `Co-Pliot ${copilotName.value} is Ready`;

            let fuelReady;
            let cargoReady;
            let fieldsValidated;
            
            if(validateInput(pilotName.value) === "Empty" 
            || validateInput(copilotName.value) === "Empty" 
            || validateInput(fuelLevel.value) === "Empty"  
            || validateInput(cargoLevel.value) === "Empty") {
                alert("All fields are required!");
                event.preventDefault();
                fieldsValidated = false;
                }
            if(validateInput(pilotName.value) === "Is A Number" 
            || validateInput(copilotName.value) === "Is A Number"
            || validateInput(fuelLevel.value) === "Not A Number"
            || validateInput(cargoLevel.value) === "Not A Number"){
                alert("Make sure to enter valid information for each field!");
                event.preventDefault();
                fieldsValidated = false;
                }            
            if(Number(fuelLevel.value) < 10000) {
                document.getElementById("faultyItems").style.visibility = "visible";
                document.getElementById("fuelStatus").innerText = ` ${fuelLevel.value} too low for launch`
                document.getElementById('launchStatus').innerText = 'Shuttle not ready for launch!';
                document.getElementById('launchStatus').style.color= "red";
                fuelReady = false;
                event.preventDefault();
                }else{
                    fuelReady = true;

                }
            if(Number(cargoLevel.value) > 10000){
                document.getElementById("faultyItems").style.visibility = "visible";
                document.getElementById("cargoStatus").innerText = `${cargoLevel.value} too high for launch`
                document.getElementById('launchStatus').innerText = 'Shuttle not ready for launch!';
                document.getElementById('launchStatus').style.color= "red";
                cargoReady = false;
                event.preventDefault();
                }else{
                cargoReady = true;
                }
            if (fuelReady && cargoReady && fieldsValidated) {
                document.getElementById("faultyItems").style.visibility = "visible";
                document.getElementById('launchStatus').innerText = 'Shuttle is ready for launch!';
                document.getElementById('launchStatus').style.color= "green";
                event.preventDefault() 
             }
            });
    
    };

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json")
            .then( function(response) {
                response.json()
             }); 
    return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.floor(Math.random() * planets.length);
    console.log(planets[index]);

    return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
