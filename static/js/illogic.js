function init() {
    
    d3.json(`/crimerates`).then(function(response) {
        
        console.log("inside arrest rate chart building...");
        crime_types = [];
        crime_type_rates = [];
        for (const [key, value] of Object.entries(response)) {
            crime_types.push(key);
            crime_type_rates.push(value * 100);
        }

        var trace1 = {
            x: crime_types,
            y: crime_type_rates,
            type: "bar"
        };
          
        var data = [trace1];
        var layout = {
            title: "Arrest Rate by Crime Type",
            xaxis: { title: "Crime Type" },
            yaxis: { title: "Arrest Rate (%)" }
        };

        Plotly.newPlot("arrestcrimetype", data, layout);
    });
}

init();