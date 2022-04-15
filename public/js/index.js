// const DUMMY_DATA = [
//   { id: 'd1', value: 10, region: 'USA' },
//   { id: 'd2', value: 11, region: 'India' },
//   { id: 'd3', value: 12, region: 'China' },
//   { id: 'd4', value: 6, region: 'Germany' },
// ];

// const xScale = d3
//   .scaleBand()
//   .domain(DUMMY_DATA.map((dataPoint) => dataPoint.region))
//   .rangeRound([0, 250])
//   .padding(0.1);

// const yScale = d3.scaleLinear().domain([0, 15]).range([200, 0]);

// const container = d3.select('svg').classed('container', true);

// const bars = container
//   .selectAll('.bar')
//   .data(DUMMY_DATA)
//   .enter() //gives you missing elements that were not rendered yet
//   .append('rect')
//   .classed('bar', true)
//   .attr('width', xScale.bandwidth())
//   .attr('height', (data) => 200 - yScale(data.value))
//   .attr('x', (data) => xScale(data.region))
//   .attr('y', (data) => yScale(data.value));

// // setTimeout(() => {
// //   bars.data(DUMMY_DATA.slice(0, 2)).exit().remove();
// // }, 2000);

//   const countryData = {
//     items: ['China', 'India', 'USA'],
//     addItem(item) {
//       this.items.push(item);
//     },
//     removeItem(index) {
//       this.items.splice(index, 1);
//     },
//     updateItem(index, newItem) {
//       this.items[index] = newItem;
//     }
//   }

//   d3.select('#d3')
//     .selectAll('li')
//     .data(countryData.items, data => data)
//     .enter()
//     .append('li')
//     .text(data => data);

//   setTimeout(() => {
//     countryData.addItem('Germany');
//     d3.select('#d3')
//       .selectAll('li')
//       .data(countryData.items, data => data)
//       .enter()
//       .append('li')
//       .classed('added', true)
//       .text(data => data);
//   }, 2000);

//   setTimeout(() => {
//     countryData.removeItem(0);
//     d3.select('#d3')
//       .selectAll('li')
//       .data(countryData.items, data => data)
//       .exit()
//       .classed('redundant', true)
//   }, 4000);

//   setTimeout(() => {
//     countryData.updateItem(1, 'Russia');
//     d3.select('#d3')
//       .selectAll('li')
//       .data(countryData.items, data => data)
//       .exit()
//       .classed('updated', true)
//       .text('Russia');
//   }, 6000);

const DUMMY_DATA = [
  { id: 'd1', value: 10, region: 'USA' },
  { id: 'd2', value: 11, region: 'India' },
  { id: 'd3', value: 12, region: 'China' },
  { id: 'd4', value: 6, region: 'Germany' },
];

const MARGINS = { top: 20, bottom: 10 };
const CHART_WIDTH = 600;
const CHART_HEIGHT = 400 - MARGINS.top - MARGINS.bottom;

let selectedData = DUMMY_DATA;

const x = d3.scaleBand().rangeRound([0, CHART_WIDTH]).padding(0.1); //makes equally sized items along x axis
const y = d3.scaleLinear().range([CHART_HEIGHT, 0]);

const chartContainer = d3
  .select('svg')
  .attr('width', CHART_WIDTH)
  .attr('height', CHART_HEIGHT + MARGINS.top + MARGINS.bottom);

x.domain(DUMMY_DATA.map((d) => d.region));
y.domain([0, d3.max(DUMMY_DATA, (d) => d.value) + 3]);

const chart = chartContainer.append('g');

chart
  .append('g')
  .call(d3.axisBottom(x).tickSizeOuter(0))
  .attr('transform', `translate(0, ${CHART_HEIGHT})`)
  .attr('color', '#4f009e');

function renderChart() {
  chart
    .selectAll('.bar')
    .data(selectedData, (data) => data.id)
    .enter()
    .append('rect')
    .classed('bar', true)
    .attr('width', x.bandwidth())
    .attr('height', (data) => CHART_HEIGHT - y(data.value))
    .attr('x', (data) => x(data.region))
    .attr('y', (data) => y(data.value));

  chart
    .selectAll('.bar')
    .data(selectedData, (data) => data.id)
    .exit()
    .remove();

  chart
    .selectAll('.label')
    .data(selectedData, (data) => data.id)
    .enter()
    .append('text')
    .text((data) => data.value)
    .attr('x', (data) => x(data.region) + x.bandwidth() / 2)
    .attr('y', (data) => y(data.value) - 20)
    .attr('text-anchor', 'middle')
    .classed('label', true);

  chart
    .selectAll('.label')
    .data(selectedData, (data) => data.id)
    .exit()
    .remove();
}

renderChart();

let unselectedIds = [];

const listItems = d3
  .select('#data')
  .select('ul')
  .selectAll('li')
  .data(DUMMY_DATA)
  .enter()
  .append('li');

listItems.append('span').text((data) => data.region);

listItems
  .append('input')
  .attr('type', 'checkbox')
  .attr('checked', true)
  .on('change', (data) => {
    if (unselectedIds.indexOf(data.id) === -1) {
      unselectedIds.push(data.id);
    } else {
      unselectedIds = unselectedIds.filter((id) => id !== data.id);
    }
    selectedData = DUMMY_DATA.filter((d) => unselectedIds.indexOf(d.id) === -1);
    renderChart();
  });
