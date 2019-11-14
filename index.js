

var penPromise = d3.json("penguins/classData.json");

penPromise.then(function(penguins)
   {
       setup(penguins);         
                
    }),
    function(err)
                {
    console.log("fail",err);
    }



var screen = {width:400,height:500}
var margins = {top:10,right:50,bottom:50,left:50}




var setup = function(penguins)
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
                .domain([0,37])
                .range([0,width])
    
    var yScale = d3.scaleLinear()
                .domain([0,10])
                .range([height,0])
    
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
    
    d3.select("svg")
        .append("g")
        .attr("class","axis");
    
    d3.select(".axis")
        .append("g")
        .attr("id","xAxis")
        .attr("transform","translate(" + margins.left + "," + (margins.top + height) + ")")
        .call(xAxis)
    
    d3.select(".axis")
        .append("g")
        .attr("id","yAxis")
        .attr("transform","translate(25,"+margins.top+")")
        .call(yAxis)
    
    drawArray(penguins, xScale, yScale);
    
}

var drawArray = function(penguins, xScale, yScale)
{
    var arrays = d3.select("#graph")
    .selectAll("g")
    .data(penguins)
    .enter()
    .append("g")
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width",1)
    .on('mouseover', function(d, i)
    
    {
    d3.select(this)
        .attr("stroke", "red")
    d3.select("#image *").remove();
    d3.select("#image")
    .append("img")
    .attr("src", "penguins/" + penguins[i].picture);
    })
    .on('mouseout', function()
    {
    d3.select(this)
        .attr("stroke","blue")
    d3.select("#image *").remove();
    });
    
    
    var lineGenerator = d3.line()
        .x(function(num,index){return xScale(index)})
        .y(function(num){return yScale(num)})
        .curve(d3.curveNatural)
    
d3.select("body")
    .append("div")
    .attr("id","image");
    
arrays.datum(function(obj)
{
    return obj.quizes.map(function(d){return d.grade;});
})
    .append('path')
    .attr("d", lineGenerator)
    

}
             
             
    


    
    
    
    
    
    
    
    
    
    
    
    
