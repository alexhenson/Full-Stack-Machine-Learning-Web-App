// BAR CHART
d3.csv('data/cars.csv').then((data) => {
  const carMap = new Map();

  for (let obj of data) {
    carname = obj.carname.split(' ')[0];
    carMap.set(carname, carMap.has(carname) ? carMap.get(carname) + 1 : 1);
  }

  const arr = Array.from(carMap);

  const carArrOfObj = arr.map(([key, value]) => {
    return { make: key, count: value };
  });

  carArrOfObj.splice(10);

  const sortedArr = carArrOfObj.sort((x, y) => {
    if (x.make < y.make) {
      return -1;
    }
    if (x.make > y.make) {
      return 1;
    }
    return 0;
  });

  const MARGINS = { top: 20, bottom: 10 };
  const CHART_WIDTH = 800;
  const CHART_HEIGHT = 500 - MARGINS.top - MARGINS.bottom;

  let selectedData = sortedArr;

  const x = d3.scaleBand().rangeRound([0, CHART_WIDTH]).padding(0.1); //makes equally sized items along x axis
  const y = d3.scaleLinear().range([CHART_HEIGHT, 0]);

  const chartContainer = d3
    .select('svg')
    .attr('width', CHART_WIDTH)
    .attr('height', CHART_HEIGHT + MARGINS.top + MARGINS.bottom);

  x.domain(sortedArr.map((d) => d.make));
  y.domain([0, d3.max(sortedArr, (d) => d.count) + 3]);

  const chart = chartContainer.append('g');

  chart
    .append('g')
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .style('font', '16px Helvetica')
    .attr('transform', `translate(0, ${CHART_HEIGHT})`)
    .attr('color', 'black');

  function renderChart() {
    chart
      .selectAll('.bar')
      .data(selectedData, (data) => data.make)
      .enter()
      .append('rect')
      .classed('bar', true)
      .attr('width', x.bandwidth())
      .attr('height', (data) => CHART_HEIGHT - y(data.count))
      .attr('x', (data) => x(data.make))
      .attr('y', (data) => y(data.count));

    chart
      .selectAll('.bar')
      .data(selectedData, (data) => data.make)
      .exit()
      .remove();

    chart
      .selectAll('.label')
      .data(selectedData, (data) => data.count)
      .enter()
      .append('text')
      .text((data) => data.count)
      .attr('x', (data) => x(data.make) + x.bandwidth() / 2)
      .attr('y', (data) => y(data.count) - 10)
      .attr('text-anchor', 'middle')
      .classed('label', true);

    chart
      .selectAll('.label')
      .data(selectedData, (data) => data.count)
      .exit()
      .remove();
  }
  renderChart();
});

// PIE CHART
const svg = d3.select('.pie'),
  width = svg.attr('width'),
  height = svg.attr('height'),
  radius = Math.min(width, height) / 2;

const g = svg
  .append('g')
  .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

const color = d3.scaleOrdinal(['#C7CEEA', '#B5EAD7', '#FFDAC1', '#FF9AA2']);
const pie = d3.pie().value((d) => d.percent);
const path = d3
  .arc()
  .outerRadius(radius - 40)
  .innerRadius(0);
const label = d3
  .arc()
  .outerRadius(radius)
  .innerRadius(radius - 150);

d3.csv('/data/cars_percent.csv').then((data) => {
  var arc = g
    .selectAll('.arc')
    .data(pie(data))
    .enter()
    .append('g')
    .attr('class', 'arc');
  arc
    .append('path')
    .attr('d', path)
    .attr('fill', (d) => color(d.data.status));

  // Places TRUE and FALSE labels outside of the pie chart
  arc
    .append('text')
    .style('font', '16px Helvetica')
    .attr('transform', (d) => {
      return (
        'translate(' +
        (radius - 12) *
          Math.sin((d.endAngle - d.startAngle) / 2 + d.startAngle) +
        ', ' +
        -1 *
          (radius - 12) *
          Math.cos((d.endAngle - d.startAngle) / 2 + d.startAngle) +
        ')'
      );
    })
    .text((d) => d.data.status);
  
  // Places percentage labels in the pie chart
  arc
    .append('text')
    .style('font', '16px Helvetica')
    .attr('transform', (d) => 'translate(' + label.centroid(d) + 100 + ')')
    .text((d) => d.data.percent);
  
  // Places a chart title
  svg
    .append('g')
    .attr('transform', 'translate(' + (width / 2 - 180) + ',' + 20 + ')')
    .append('text')
    .text('Emmissions Passing Percentage')
    .attr('class', 'title');
});

//SCATTERPLOT
// set the dimensions and margins of the graph
const margin = { top: 10, right: 30, bottom: 30, left: 60 },
  scatWidth = 800 - margin.left - margin.right,
  scatHeight = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
const scatSvg = d3
  .select('.scatter')
  .append('svg')
  .attr('width', scatWidth + margin.left + margin.right)
  .attr('height', scatHeight + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

//Read the data
d3.csv('/data/cars.csv').then(function (data) {
  // Add X axis
  const x = d3.scaleLinear().domain([0, 260]).range([0, scatWidth]);
  scatSvg
    .append('g')
    .attr('transform', `translate(0, ${scatHeight})`)
    .call(d3.axisBottom(x));

  // Add Y axis
  const y = d3.scaleLinear().domain([0, 50]).range([scatHeight, 0]);
  scatSvg.append('g').call(d3.axisLeft(y));

  // Add dots
  scatSvg
    .append('g')
    .selectAll('dot')
    .data(data)
    .join('circle')
    .attr('cx', function (d) {
      return x(d.horsepower);
    })
    .attr('cy', function (d) {
      return y(d.mpg);
    })
    .attr('r', 1.5)
    .style('fill', '#69b3a2');

  // Add chart title
  scatSvg
    .append('g')
    .attr('transform', 'translate(' + (scatWidth / 2 - 150) + ',' + 20 + ')')
    .append('text')
    .text('Horsepower vs. Miles per Gallon (MPG)')
    .attr('class', 'title');

  scatSvg
    .append('text')
    .style('font', '22px Helvetica')
    .attr('class', 'x label')
    .attr('text-anchor', 'middle')
    .attr('x', scatWidth / 2)
    .attr('y', scatHeight - 10)
    .text('Horsepower');

  scatSvg
    .append('text')
    .style('font', '22px Helvetica')
    .attr('class', 'y label')
    .attr('text-anchor', 'middle')
    .attr('x', -300)
    .attr('y', -60)
    .attr('dy', '.75em')
    .attr('transform', 'rotate(-90)')
    .text('Miles per Gallon (MPG)');
});
