
/*
 * PrioVis - Object constructor function
 * @param _parentElement 	-- the HTML element in which to draw the visualization
 * @param _data						-- the actual data: perDayData 
 */

class ScatterPlot {
    
    constructor (_parentElement, _data,){
        this.parentElement = _parentElement;
        this.data = _data;
        this.filteredData = this.data;
        this.xAttr = 'population_07'
        this.yAttr = 'co2pp_07'

        this.initVis();
    }


    /*
    * Initialize visualization (static content, e.g. SVG area or axes)
    */

    initVis(){
        var vis = this;

        vis.margin = { top: 20, right: 20, bottom: 200, left: 50 };

        vis.width = $("#" + vis.parentElement).width() - vis.margin.left - vis.margin.right,
            vis.height = 500 - vis.margin.top - vis.margin.bottom;

        // SVG drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");


        // Scales and axes
        vis.x = d3.scaleLinear()
        .range([0,vis.width]);

        vis.y = d3.scaleLinear()
            .range([vis.height,0]);

        vis.xAxis = d3.axisBottom()
            .scale(vis.x);

        vis.yAxis = d3.axisLeft()
            .scale(vis.y);

        vis.svg.append("g")
            .attr("class", "x-axis axis")
            .attr("transform", "translate(0," + vis.height + ")");

        vis.svg.append("g")
            .attr("class", "y-axis axis");

        // Axis title
        vis.svg.append("text")
            .attr("x", -50)
            .attr("y", -8)
            .text(vis.yAttr);

                // Axis title
        vis.svg.append("text")
        .attr("x", vis.width/2)
        .attr("y", vis.height + 40)
        .style('text-anchor','middle')
        .text(vis.xAttr);


        // (Filter, aggregate, modify data)
        vis.wrangleData();
    }



    /*
    * Data wrangling
    */

    wrangleData(){
        var vis = this;
        vis.data.map(d=>{
            d[vis.xAttr] = +d[vis.xAttr]
            d[vis.yAttr] = +d[vis.yAttr]})
        vis.displayData = vis.data;

        console.log('displayData', vis.data)

        // Update the visualization
        vis.updateVis();
    }



    /*
    * The drawing function
    */

    updateVis(){
        let vis = this;

        let xDomain = d3.extent(vis.displayData,d=>d[vis.xAttr])
        let range = xDomain[1] - xDomain[0]
        // Update domains
        vis.y.domain(d3.extent(vis.displayData,d=>d[vis.yAttr]));
        vis.x.domain([xDomain[0]-range*0.1, xDomain[1]])

        console.log(vis.y.domain())
        console.log(vis.displayData)

        var bars = vis.svg.selectAll(".bar")
            .data(vis.displayData)

        bars.enter().append("circle")
            .attr("class", "bar")

            .merge(bars)
            .transition()
            .attr("r",5)
            .attr("cx",d=>vis.x(d[vis.xAttr]))
            .attr("cy",d=>vis.y(d[vis.yAttr]))


        bars.exit().remove();

        // Call axis function with the new domain
        vis.svg.select(".y-axis").call(vis.yAxis);

        vis.svg.select(".x-axis").call(vis.xAxis)
            // .selectAll("text")
            // .style("text-anchor", "end")
            // .attr("dx", "-.8em")
            // .attr("dy", ".15em")
            // .attr("transform", function(d) {
            //     return "rotate(-45)"
            // })
            // .text(d=>{return vis.displayData[d]['country']});
    }

    onSelectionChange(selectionStart, selectionEnd){
        var vis = this;

        vis.filteredData = vis.data.filter(function(d){
            return d.time >= selectionStart && d.time <= selectionEnd;
        });

        vis.wrangleData();
    }
}
