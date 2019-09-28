d3.json(`/pie`).then(function(response) {
        
    console.log("inside pie chart building...");
    crime_types = [];
    crime_type_values = [];
    for (const [key, value] of Object.entries(response)) {
        crime_types.push(key);
        crime_type_values.push(value);
    }
    var trace = {
        type: "pie",
        labels: crime_types.slice(0,15),
        values: crime_type_values.slice(0, 15)
    };
    
    var data = [trace];
    var layout = {
      title: "Chicago Crime Types (2010-2019)"
    };

    Plotly.newPlot("pie", data, layout);
});

d3.json('/line').then(function(response) {

    console.log("inside line chart building...");

    var data = [];
    for (const [key, value] of Object.entries(response)) {
        var crime_type = key;
        var crime_data = value;
        var crime_years = [];
        var crime_count = [];

        for (const [key, value] of Object.entries(crime_data)) {
            crime_years.push(key);
            crime_count.push(value);
            
        }
        var trace = {
            x: crime_years,
            y: crime_count,
            mode: 'lines+markers',
            type: 'scatter',
            name: crime_type
          };
        
        data.push(trace);
        
    }
    var layout = {
        xaxis: {
          range: [ 2010, 2019 ],
          title: "Year"
        },
        yaxis: {
          title: "No. of occurences"
        },
        title:'Crimes Over Years',
      };

    Plotly.newPlot('line', data, layout);
    
});


d3.json('/time').then(function(response) { 

  var bin_names = [];
  var occurences = [];
  for (const [key, value] of Object.entries(response)) {
    bin_names.push(key);
    occurences.push(value);
  }
  
  // var ctx = document.getElementById('bar-chart').getContext('2d');
  // Bar chart
  new Chart(document.getElementById('bar-chart'), {
  type: 'bar',
  data: {
    labels: bin_names,
    datasets: [
      {
        label: "No. of crimes occurred",
        backgroundColor: ["#3e95cd", "#3e95cd","#3e95cd","#3e95cd","#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd"],
        data: occurences
      }
    ]
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
      text: 'No. of Crime occurences by Time of the day',
      fontSize: 15,
      padding: 30
    },
    maintainAspectRatio: false,
    responsive:true,
    layout: {
      padding: {
          left: 120,
          right: 0,
          top: 50,
          bottom: 0
      }
  }
  }
});

});