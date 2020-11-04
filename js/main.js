

// Function to convert date objects to strings or reverse
var dateFormatter = d3.timeFormat("%Y-%m-%d");
var dateParser = d3.timeParse("%Y-%m-%d");


// (1) Load data with promises

let promises = [
    d3.csv("data/large.csv")
];

Promise.all(promises)
    .then( function(data){ createVis(data)})
    .catch( function (err){console.log(err)} );

function createVis(data){

    let barChart = new BarChart("barChart", data[0]);
    let scatterPlot = new ScatterPlot("scatter", data[0]);

    let animate = new Animate("animation", data[0]);

    let otherCondition = new Animate("condition2", data[0]);




    // (5) Bind event handler
    $(MyEventHandler).bind("selectionChanged", function(event, rangeStart, rangeEnd){
        ageVis.onSelectionChange(rangeStart, rangeEnd);
        prioVis.onSelectionChange(rangeStart, rangeEnd);
        countVis.onSelectionChange(rangeStart, rangeEnd);
    });
}
