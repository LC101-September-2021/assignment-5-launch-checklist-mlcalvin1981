 require('isomorphic-fetch');
// Write your helper functions here!

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

function updateDom(document) {
    let faultyItems = document.getElementById('faultyItems');
    let fuelStatus = document.getElementById('fuelStatus');
    let cargoStatus = document.getElementById('cargoStatus');
    let launchStatus = document.getElementById('launchStatus');
    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    
    faultyItems.style.visibility = "hidden";
    launchStatus.innerText = 'Awaiting Information Before Launch';
    launchStatus.style.color = "black";
    pilotStatus.innerText = "Pilot Ready";
    copilotStatus.innerText = "Co-pilot Ready";
    cargoStatus.innerText = "Fuel level high enough for launch";
    fuelStatus.innerText = "Cargo mass low enough for launch";
}

function validateInput(testInput) {
    if(testInput === "") {
        return "Empty";
    } else if(isNaN(testInput) === true) {
        return "Not a Number"
    } else if(isNaN(testInput) === false) {
        return "Is a Number";
    }
}
function formSubmission(document) {
    let form = document.getElementById("launchForm");
    form.addEventListener("submit", function(event) {
        let pilotName = document.querySelector("input[name=pilotName]");
        let copilotName = document.querySelector("input[name=copilotName]");
        let fuelLevel = document.querySelector("input[name=fuelLevel]");
        let cargoMass = document.querySelector("input[name=cargoMass]");
  
        let faultyItems = document.getElementById('faultyItems');
        let fuelStatus = document.getElementById('fuelStatus');
        let cargoStatus = document.getElementById('cargoStatus');
        let launchStatus = document.getElementById('launchStatus');
        let pilotStatus = document.getElementById('pilotStatus');
        let copilotStatus = document.getElementById('copilotStatus');

  
        // Checking to make sure the form elements have values
        if (validateInput(pilotName.value) === "Empty"
            || validateInput(copilotName.value) === "Empty"
            || validateInput(fuelLevel.value) === "Empty"
            || validateInput(cargoMass.value) === "Empty") {
           alert("All fields are required!");
           event.preventDefault();
        }
  
        // Making sure the pilot name and co-pilot name input values are strings
        if (validateInput(pilotName.value) === "Not a Number" || validateInput(copilotName.value) === "Not a Number"){
           pilotStatus.innerText = `Pilot ${pilotName.value} is ready for launch`;
           copilotStatus.innerText = `Co-pilot ${copilotName.value} is ready for launch`;
           event.preventDefault();
        }
        else{
           alert("Pilot & Co-pilot need to be human names, not integers!");
           event.preventDefault();
        }
  
        // Making sure the fuel level and cargo mass input values are numbers
        if (validateInput(fuelLevel.value) === "Not a number" || validateInput(cargoMass.value) === "Not a Number"){
           alert("Fuel level & cargo mass need to be integers!");
           event.preventDefault();
        }
        else{ // If the fuel level and cargo mass are integers, make these checks below
  
           if(fuelLevel.value < 10000){ // Is the fuelLevel value below 10,000?    
              faultyItems.style.visibility = 'visible';
              console.log("!", faultyItems.style.visibility)
              fuelStatus.innerText =  `Fuel level too low for the journey!`;
              launchStatus.innerHTML = `Shuttle not ready for launch`;
              launchStatus.style.color = 'red';
              event.preventDefault();
           }else{
              faultyItems.style.visibility = 'visible';
              fuelStatus.innerText = `Fuel level high enough for launch`;
              event.preventDefault();
           }
  
           if(cargoMass.value > 10000){  // Is the cargoMass above 10,000?
              faultyItems.style.visibility = 'visible';
              cargoStatus.innerText = `Cargo mass too heavy for the shuttle to take off!`;
              launchStatus.innerHTML = `Shuttle not ready for launch`;
              launchStatus.style.color = 'red';
              event.preventDefault();
           }else{
              faultyItems.style.visibility = 'visible';
              cargoStatus.innerHTML = `Cargo mass low enough for launch`;
              event.preventDefault();
           }
  
           if(fuelLevel.value >= 10000 && cargoMass.value <= 10000) { // If the fuelLevel is equal to or above 10,000 AND cargoMass is equal to or below 10,000, execute this code 
              faultyItems.style.visibility = 'visible';
              launchStatus.innerHTML = `Shuttle is ready for launch`;
              launchStatus.style.color = 'green';
              fuelStatus.innerText = `Fuel level high enough for launch`;
              cargoStatus.innerText = `Cargo mass low enough for launch`;
              event.preventDefault();
           }
        }
    })
}

async function myFetch() {
        let response = await (await fetch("https://handlers.education.launchcode.org/static/planets.json")).json();
        return response;
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
module.exports.updateDom = updateDom;
