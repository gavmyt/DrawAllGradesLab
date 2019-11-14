var screen = {width:400,height:500}
var margins = {top:10,right:50,bottom:50,left:50}

var penPromise = d3.json(classData.json)

var setup = function(array2D)
{
    d3.select("svg")
        .attr("width",screen.width)
        .attr("height",screen.height)
        .append("g")
        .attr("id","graph")
        .attr("transform","translate("+margins.left+
                ","+margins.top+")");
    
    
    var width = screen.width - margins.left - margins.right;
    var height = screen.height - margins.top - margins.bottom;
    
    var xScale = d3.scaleLinear()
                .domain([0,9])
                .range([0,width])
    
    var yScale = d3.scaleLinear()
                .domain([0,10])
                .range([height,0])
    
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
    d3.select("svg")
        .append("g")
        .classed("axis",true);
    
    d3.select(".axis")
        .append("g")
        .attr("id","xAxis")
        .attr("transform","translate("margins.left+","+(margins.top+height)+")")
        .call(xAxis)
    
    d3.select(".axis")
        .append("g")
        .attr("id","yAxis")
        .attr("transform","translate(25,"+margins.top+")")
        .call(yAxis)
    
    drawArray(array2D,xScale,yScale);
    
}

var drawArray = function(array2D,xScale,yScale)
{
    var arrays = d3.select("#graph")
    .selectAll("g")
    .data(array2D)
    .enter()
    .append("g")
    
    var lineGenerator - d3.line()
        .x(function(num,index){return xScale(index)})
        .y(function(num){return yScale(num)})
        .curve(d3.curveNatural)
    
arrays.datum(function(obj){return obj.arr})
    .append('path')
    .attr("d", lineGenerator)
    
}
    
var data = [
    { name:"Fred",arr:[ 3,5,7,9,1,2,4,6,8,10]},
    { name:"Jeff",arr:[ 9,8,8,6,6,4,4,2,1,0]},
    
]
    setup(data);
    
    
    
    
    
    
    
    
    
    
    
    
}