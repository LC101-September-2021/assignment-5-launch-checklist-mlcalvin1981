window.addEventListener("load", function() {
    let document = window.document;
    let faultyItems = document.getElementById("faultyItems");
    let pilotName= document.querySelector("input[name=pilotName]");
    let copilotName = document.querySelector("input[name=copilotName]");
    let fuelLevel = document.querySelector("input[name=fuelLevel]");
    let cargoMass = document.querySelector("input[name=cargoMass]");

    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    console.log(listedPlanetsResponse);
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);
    }).then(function () {
        console.log(listedPlanets);
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        const missionTarget = pickPlanet(listedPlanets);
        addDestinationInfo(
            document,
            missionTarget.name,
            missionTarget.diameter,
            missionTarget.star,
            missionTarget.distance,
            missionTarget.moons,
            missionTarget.image
        );
        formSubmission(
            document,
            faultyItems,
            pilotName,
            copilotName,
            fuelLevel,
            cargoMass
        );
    });
});