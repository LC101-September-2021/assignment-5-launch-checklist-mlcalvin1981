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
function validateInput(testInput) {
    if(testInput === "") {
        return "Empty";
    } else if(isNaN(testInput) === true) {
        return "Not a Number";
    } else if(isNaN(testInput) === false) {
        return "Is a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
    let form = document.getElementById("launchForm");
    form.addEventListener("submit", function(event) {
        let pilotStatus = document.getElementById('pilotStatus');
        let copilotStatus = document.getElementById('copilotStatus');
        let fuelStatus = document.getElementById('fuelStatus');
        let cargoStatus = document.getElementById('cargoStatus');
        let launchStatus = document.getElementById('launchStatus');
        // Checking to make sure the form elements have values
        if ((pilot === '')|| (copilot === '')||(fuelLevel === '') || (cargoMass === '')) {
            alert("Please enter all information");
            items.style.visibility = 'hidden';
            launchStatus.style.color = 'black';
			launchStatus.innerHTML = 'Awaiting Information Before Launch';
            
         } else if (isNaN(pilot.value) === false || isNaN(copilot.value) === false) {
            alert("Please enter valid name for Pilot Name or Co-pilot Name (or both)");
            event.preventDefault();
         } else if (isNaN(fuelLevel) === true || isNaN(cargoMass) === true) {
            console.log("!", fuelLevel.value);
            alert("Please enter valid number for Fuel Level or Cargo Mass (or both)");
            event.preventDefault();
         } else {
            pilotStatus.innerHTML = "Pilot " + pilot + " Ready";
            copilotStatus.innerHTML = "Co-pilot " + copilot + " Ready";
            if (fuelLevel <= 10000) {
                list.style.visibility = "visible";
                launchStatus.innerHTML = "Shuttle Not Ready for Launch";
                launchStatus.style.color = "red";
                fuelStatus.innerHTML = "Fuel level too low for launch";
                event.preventDefault();
            } else {
               fuelStatus.innerHTML = "Fuel level high enough for launch";
               event.preventDefault();
            }
            if (cargoMass >= 10000) {
               list.style.visibility = "visible";
               launchStatus.innerHTML = "Shuttle Not Ready for Launch";
               launchStatus.style.color = "red";
               cargoStatus.innerHTML = "Cargo mass too high for launch";
               event.preventDefault();
            } else {
               cargoStatus.innerHTML = "Cargo mass low enough for launch";
               event.preventDefault();
            }
            if (cargoMass <= 10000 && fuelLevel >= 10000) {
                launchStatus.innerHTML = "Shuttle Ready for Launch";
                launchStatus.style.color = "green";
                cargoStatus.innerHTML = "Cargo mass low enough for launch";
                list.style.visibility = "hidden";
                event.preventDefault();
            }
        }
        event.preventDefault();
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
