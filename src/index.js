d3.csv('./data/result2.csv', function (rawData) {
        
        const years = Object.keys(rawData[0])
          .filter(key => key !== 'Year');
        const keys = rawData
          .map(d => d['Year'])
          .filter(key => key !== 'Total');
        
        const data = years.map(year => {
          const row = { date: new Date(year) };
          rawData.forEach(d => {
            row[d['Year']] = +d[year];
          });
          return row;
        });
        console.log(data);
        render(data, keys);
      });

      var margin = { top: 0, bottom: 25, left: 20, right: 810 };

      var svg = d3.select('svg');
      var width = +svg.attr('width');
      var height = +svg.attr('height');
      
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
        .order(d3.stackOrderInsideOut)
      ;
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
      
      // Render StreamGraph
      function render(data, keys) {
        stack.keys(keys);
        var stacked = stack(data);
        
        var innerWidth = width - margin.right - margin.left;
        var innerHeight = height - margin.top - margin.bottom;

        xScale
          .domain(d3.extent(data, xValue))
          .range([0, innerWidth]);

        yScale
          .domain([
            d3.min(stacked, function (series) {
              return d3.min(series, function (d) { return d[0]; });
            }),
            d3.max(stacked, function (series) {
              return d3.max(series, function (d) { return d[1]; });
            })
          ])
          .range([innerHeight, 0]);
        
        colorScale.domain(d3.range(keys.length));
        
        var paths = marksG.selectAll('path').data(stacked);
        var pathsEnter = paths
          .enter().append('path');
        pathsEnter.merge(paths)
            .attr('fill', function (d) { return colorScale(d.index); })
            .attr('stroke', function (d) { return colorScale(d.index); })
            .attr('d', area);
        
        paths.select('title')
          .merge(pathsEnter.append('title'))
            .text(function (d) { return d.key; })

        var labels = marksG.selectAll('text').data(stacked)
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