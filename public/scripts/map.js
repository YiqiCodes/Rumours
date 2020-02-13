function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const mapOptions = {
    zoom: 16,
    center: {
      lat: 43.644395,
      lng: -79.402211
    }
  };
  const map = new google.maps.Map(document.getElementById("map"), mapOptions);
  directionsRenderer.setMap(map); // renders map based on coords
  const selectedMode = document.getElementById("mode").value;
  const route = {
    origin: {
      lat: 43.644395,
      lng: -79.402211
    }, // LHL
    destination: {
      lat: 43.647851,
      lng: -79.390423
    }, // HOME
    travelMode: google.maps.TravelMode[selectedMode]
  };

  // render routes
  directionsService.route(route, function(response, status) {
    // anonymous function to capture directions
    if (status !== "OK") {
      window.alert("Directions request failed due to " + status);
      return;
    } else {
      directionsRenderer.setDirections(response); // Add route to the map
      const directionsData = response.routes[0].legs[0]; // Get data about the mapped route
      if (!directionsData) {
        window.alert("Directions request failed");
        return;
      } else {
        if (document.getElementById("msg") != null) {
          document.getElementById(
            "msg"
          ).innerHTML = `Total ${selectedMode} distance is
              ${directionsData.distance.text}, it will take approximately
              ${directionsData.duration.text} .`;
        }
      }
    }
  });
}
