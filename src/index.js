function getRatio(side) {
    return (( margin[side] / width ) * 100 + 1) + "%";
}

var margin = {left: 20, top: 20, right: 20, bottom: 20},
    width = 720 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom,
    marginRatio = {
        left: getRatio("left"),
        top: getRatio("top"),
        right: getRatio("right"),
        bottom: getRatio("bottom")
    };

var svg = d3.select("div#stackedAreaChart")
    .append("div")
    .attr("id", "svg-container")
    .append("svg")
    .style("padding", 0 + " " + 0 + " " + 0 + " " + marginRatio.left)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 " + ( width + margin.left + margin.right  ) + " " + ( height + margin.top + margin.bottom ))
    .attr("id", "svg-content-responsive")
    .attr("class", "graph-svg-placeholder")
    .append("g")
    .attr("transform", "translate(" + 2 + "," + 2 + ")");

var g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
var xAxisG = g.append('g')
    .attr('class', 'axis');
var xAxisMinorG = xAxisG.append('g')
    .attr('class', 'axis axis--minor');
var xAxisMajorG = xAxisG.append('g')
    .attr('class', 'axis axis--major');
var marksG = g.append('g');
  
var stack = d3.stack()
    .offset(d3.stackOffsetExpand)
    .order(d3.stackOrderInsideOut);
var xValue = function (d) { return d.date; };
var xScale = d3.scaleTime();
var yScale = d3.scaleLinear();
var colorScale = d3.scaleOrdinal().range(d3.schemeCategory10);

var xAxisMajor = d3.axisBottom().scale(xScale);
var xAxisMinor = d3.axisBottom().scale(xScale).ticks(30);

var area = d3.area()
    .x(d => xScale(xValue(d.data)))
    .y0(d => yScale(d[0]))
    .y1(d => yScale(d[1]))
    .curve(d3.curveBasis);


var drValue = "DR_";
var tsvPath = "./data/DR_Cerebrovascular Disease.tsv";
var selDisease = "Cerebrovascular Disease";
  
// Render StreamGraph
function render(data, keys) {
    stack.keys(keys);
    var stacked = stack(data);

    var innerWidth = width - margin.right - margin.left;
    var innerHeight = height - margin.top - margin.bottom;

    xScale
        .domain(d3.extent(data, xValue)).range([0, innerWidth]);

    yScale
        .domain([d3.min(stacked, function (series) { return d3.min(series, function (d) { return d[0]; });}),
                    d3.max(stacked, function (series) { return d3.max(series, function (d) { return d[1]; });})])
        .range([innerHeight, 0]);

    colorScale
        .domain(d3.range(keys.length));

    function updateData(d){
        selDisease = d.key;
        document.getElementById("disease").innerHTML = d.key;
        tsvPath = "./data/" + drValue + selDisease + ".tsv";
        drawLineChart(tsvPath);
    }

    var paths = marksG.selectAll('path').data(stacked);
    var pathsEnter = paths.enter().append('path');
    pathsEnter.merge(paths)
        .attr('fill', function (d) { return colorScale(d.index); })
        .attr('stroke', function (d) { return colorScale(d.index); })
        .attr('d', area)
        .on("click", function(d) { updateData(d); });

    paths.select('title')
        .merge(pathsEnter.append('title'))
        .text(function (d) { return "Disease: " + d.key; });

    var labels = marksG.selectAll('text').data(stacked);
    labels
        .enter().append('text')
        .attr('class', 'area-label')
        .merge(labels)
        .text(function (d) { return d.key; })
        .attr('transform', d3.areaLabel(area).interpolateResolution(1000));

    xAxisMajor.tickSize(-innerHeight);
    xAxisMinor.tickSize(-innerHeight);

    xAxisG.attr('transform', `translate(0,${innerHeight})`);
    xAxisMajorG.call(xAxisMajor);
    xAxisMinorG.call(xAxisMinor);
}

d3.csv('./data/result.csv', function (rawData) {
    const years = Object.keys(rawData[0]).filter(key => key !== 'Year');
    const keys = rawData.map(d => d['Year']).filter(key => key !== 'Total');
    const data = years.map(year => {
        const row = { date: new Date(year) };
        rawData.forEach(d => {row[d['Year']] = +d[year];});
        return row;
        });
    console.log(data);
    render(data, keys);
});


//
// Multi-line Chart Begins Here
//

function line_getRatio(side) {
    return (( margin[side] / line_width ) * 100 + 1) + "%";
}

var margin = {left: 20, top: 20, right: 20, bottom: 20};

var line_width = 1440 - margin.left - margin.right,
    line_height = 720 - margin.top - margin.bottom,
    line_marginRatio = {
        left: line_getRatio("left"),
        top: line_getRatio("top"),
        right: line_getRatio("right"),
        bottom: line_getRatio("bottom")
    };

var line_svg = d3.select("div#lineChart")
    .append("div")
    .attr("id", "svg-container")
    .append("svg")
    .style("margin", 140 + " " - 140 + " " + 0 + " " + line_marginRatio.left)
    .style("padding", 0 + " " + 20 + " " + 0 + " " + line_marginRatio.left)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 " + ( line_width + margin.left + margin.right  ) + " " + ( line_height + margin.top + margin.bottom ))
    .attr("id", "svg-content-responsive")
    .append("g")
    .attr("transform", "translate(" + 2 + "," + 2 + ")");

function drawLineChart(path){

  d3.selectAll(".multiLineChart").remove(); // reset

  var line_g = line_svg.append("g")
      .attr("class", "multiLineChart")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var parseTime = d3.timeParse("%Y");

  var x = d3.scaleTime().range([0, line_width - 280]),
      y = d3.scaleLinear().range([line_height, 0]),
      z = d3.scaleOrdinal(d3.schemeCategory10);

  var line = d3.line()
      .curve(d3.curveMonotoneX)
      .x(function(d) { return x(d.Year); })
      .y(function(d) { return y(d.DeathRate); });

  d3.tsv(path, type, function(error, data) {
    if (error) throw error;

    var races = data.columns.slice(1).map(function(id) {
      return {
        id: id,
        values: data.map(function(d) {
          return {Year: d.Year, DeathRate: d[id]};
        })
      };
    });

    x.domain(d3.extent(data, function(d) { return d.Year; }));

    y.domain([
      d3.min(races, function(c) { return d3.min(c.values, function(d) { return d.DeathRate; }); }),
      d3.max(races, function(c) { return d3.max(c.values, function(d) { return d.DeathRate; }); })
    ]);

    z.domain(races.map(function(c) { return c.id; }));

    line_g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + line_height + ")")
        .call(d3.axisBottom(x));

    line_g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y))
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "1em")
        .attr("fill", "#000")
        .text("Index Value");

    var race = line_g.selectAll(".race")
      .data(races)
      .enter().append("g")
        .attr("class", "race");

    race.append("path")
        .attr("class", "line")
        .attr("d", function(d) { return line(d.values); })
        .style("stroke", function(d) { return z(d.id); });

    race.append("text")
        .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
        .attr("transform", function(d) { return "translate(" + x(d.value.Year) + "," + y(d.value.DeathRate) + ")"; })
        .attr("x", 3)
        .attr("dy", "0.35em")
        .style("font", "14px sans-serif")
        .text(function(d) { return d.id; });
  });

  function type(d, _, columns) {
    d.Year = parseTime(d.Year);
    for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
    return d;
  }

  console.log("Disease: " + selDisease);
  console.log("Index: " + drValue);
  console.log("Path:" + tsvPath);
}

function updateIndex(indexID){
    switch (indexID) {
        case "DR": drValue = "DR_"; break;
        case "DRAA": drValue = "DRAA_"; break;
    }
    tsvPath = "./data/" + drValue + selDisease + ".tsv";
    drawLineChart(tsvPath);
}

var indexID = ["DR", "DRAA"];

indexID.forEach( function(item){
    document.getElementById(item).addEventListener("click", function(){
        updateIndex(item);
    });
});

drawLineChart(tsvPath);