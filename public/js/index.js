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

// Pie Chart
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

  arc
    .append('text')
    .attr('transform', (d) => 'translate(' + label.centroid(d) + ')')
    .text((d) => d.data.status);
  svg
    .append('g')
    .attr('transform', 'translate(' + (width / 2 - 180) + ',' + 20 + ')')
    .append('text')
    .text('Emmissions Pass/Fail Percentage')
    .attr('class', 'title');
});
