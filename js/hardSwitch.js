
/*
 * PrioVis - Object constructor function
 * @param _parentElement 	-- the HTML element in which to draw the visualization
 * @param _data						-- the actual data: perDayData 
 */

class HardSwitch {
    
    constructor (_parentElement, _data,){
        console.log(_parentElement);
        this.parentElement = _parentElement;
        this.data = _data;
        this.bar = false;
        this.initVis();
    }


    /*
    * Initialize visualization (static content, e.g. SVG area or axes)
    */

    initVis(){
        var vis = this;
        this.bar = false;

        vis.scatterPlot = new ScatterPlot(vis.parentElement, vis.data);
        vis.barChart = new BarChart(vis.parentElement, vis.data);
        vis.barChart.svg.attr("display", "none");

        $('#' + vis.parentElement + 'StartBtn').on("click",()=>vis.bars?  vis.toScatterPlot() : vis.toBarChart())
    }

    toScatterPlot(){
        let vis = this;
        vis.bars = false;
        
        vis.barChart.svg.attr("display", "none");
        vis.scatterPlot.svg.attr("display", "inline");
    }

    toBarChart(){
        let vis = this;
        vis.bars = true;
        
        vis.barChart.svg.attr("display", "inline");
        vis.scatterPlot.svg.attr("display", "none");
            
    }

}
