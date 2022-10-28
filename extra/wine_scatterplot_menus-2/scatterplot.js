export const scatterplot = (selection, props) => {
  const {
    xValue,
    xAxisLabel,
    yValue,
    circleRadius,
    yAxisLabel,
    margin,
    width,
    height,
    data,
    wine_type
  } = props;
  
  //filtering by wine type
  let filtered_data;
  let circleColor;
  
    if (wine_type === 'White Wine') {
    filtered_data = data.filter(d => d.wine_type === 'white')
    circleColor = 'GoldenRod'
  } else {
      filtered_data = data.filter(d => d.wine_type === 'red')
    	circleColor = 'maroon'
    }
  
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  
  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();
  
  const yScale = d3.scaleLinear();
  yScale.domain(d3.extent(data, yValue));
  yScale.range([innerHeight, 0]);
  yScale.nice();
  
  const g = selection.selectAll('.container').data([null]);
  const gEnter = g
    .enter().append('g')
      .attr('class', 'container');
  gEnter
    .merge(g)
      .attr('transform',
        `translate(${margin.left},${margin.top})`
      );
  
  const xAxis = d3.axisBottom(xScale)
    .tickSize(-innerHeight)
    .tickPadding(15);
  
  const yAxis = d3.axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(10);
  
  const yAxisG = g.select('.y-axis');
  const yAxisGEnter = gEnter
    .append('g')
      .attr('class', 'y-axis');
  yAxisG
    .merge(yAxisGEnter)
      .call(yAxis)
      .selectAll('.domain').remove();
  
  const yAxisLabelText = yAxisGEnter
    .append('text')
      .attr('class', 'axis-label')
      .attr('y', -53)
      .attr('fill', 'black')
      .attr('transform', `rotate(-90)`)
      .attr('text-anchor', 'middle')
    .merge(yAxisG.select('.axis-label'))
      .attr('x', -innerHeight / 2)
      .text(yAxisLabel);
  
  
  const xAxisG = g.select('.x-axis');
  const xAxisGEnter = gEnter
    .append('g')
      .attr('class', 'x-axis');
  xAxisG
    .merge(xAxisGEnter)
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)
      .selectAll('.domain').remove();
  
  const xAxisLabelText = xAxisGEnter
    .append('text')
      .attr('class', 'axis-label')
      .attr('y', 65)
      .attr('fill', 'black')
    .merge(xAxisG.select('.axis-label'))
      .attr('x', innerWidth / 2)
      .text(xAxisLabel);

  
  const circles = g.merge(gEnter)
    .selectAll('circle').data(filtered_data);
  circles
    .enter().append('circle')
      .attr('cx', innerWidth / 2)
      .attr('cy', innerHeight / 2)
      .attr('r', 0)
    	.style("fill", circleColor)
    .merge(circles)
    .transition().duration(1000)
    .delay((d, i) => i * .5)
      .attr('cy', d => yScale(yValue(d)))
      .attr('cx', d => xScale(xValue(d)))
      .attr('r', circleRadius);
};