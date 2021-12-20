



window.addEventListener("load", function() {
    //set faultyItems visibility = "hidden" (even with css, was visiblity = '')
    updateDom(window.document);
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
        console.log(missionTarget);
        addDestinationInfo(
            window.document,
            missionTarget.name,
            missionTarget.diameter,
            missionTarget.star,
            missionTarget.distance,
            missionTarget.moons,
            missionTarget.image
        );
        formSubmission(document);
    });
});