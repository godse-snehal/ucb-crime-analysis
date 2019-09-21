function init() {
    
    d3.json(`/pie`).then(function(response) {
        
        console.log("inside pie chart building...");
        crime_types = [];
        crime_type_values = [];
        for (const [key, value] of Object.entries(response)) {
            console.log(key, value);
            crime_types.push(key);
            crime_type_values.push(value);
        }
        var trace = {
            type: "pie",
            labels: crime_types.slice(0,10),
            values: crime_type_values.slice(0, 10)
        };
    
        var data = [trace];
        var layout = {title: ""};

        Plotly.newPlot("pie", data, layout);
    });
}

init();