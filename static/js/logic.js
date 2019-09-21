// function init() {
  console.log("building map...");
  var myMap = L.map("heatmap", {
    center: [41.8781, -87.6298],
    zoom: 11
    // preferCanvas: true
  });

  console.log("making tile Layer...", API_KEY);
  // Adding tile layer to the map
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    // updateWhenZooming: false,
    // updateWhenIdle: true,
    accessToken: API_KEY
  }).addTo(myMap);


  // Retrieve data from the CSV file and execute everything below
  // d3.json(`/leaflet`).then(function(response) {
   
  //   // Create a new marker cluster group
  //   var markers = L.markerClusterGroup();
  //   console.log("looping through the data...");

  //   // Loop through data
  //   for (var i = 0; i <= 925000; i++) {

  // 	  var location = response.latitude[i];

	//     // Check for location property
  //   	if (location) {

	//       // Add a new marker to the cluster group and bind a pop-up
	//       markers.addLayer(L.marker([response.latitude[i], response.longitude[i]])
	//         .bindPopup(response.primary_type[i]));
  //     }
  //   }
  //   // Add our marker cluster layer to the map
  //   myMap.addLayer(markers);

  // });
// }

// init();
