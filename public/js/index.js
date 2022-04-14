const DUMMY_DATA = [
  { id: 'd1', value: 10, region: 'USA' },
  { id: 'd2', value: 11, region: 'India' },
  { id: 'd3', value: 12, region: 'China' },
  { id: 'd4', value: 6, region: 'Germany' },
];

const xScale = d3
  .scaleBand()
  .domain(DUMMY_DATA.map((dataPoint) => dataPoint.region))
  .rangeRound([0, 250])
  .padding(0.1);

const yScale = d3.scaleLinear().domain([0, 15]).range([200, 0]);

const container = d3.select('svg').classed('container', true);

const bars = container
  .selectAll('.bar')
  .data(DUMMY_DATA)
  .enter() //gives you missing elements that were not rendered yet
  .append('rect')
  .classed('bar', true)
  .attr('width', xScale.bandwidth())
  .attr('height', (data) => 200 - yScale(data.value))
  .attr('x', (data) => xScale(data.region))
  .attr('y', (data) => yScale(data.value));

// setTimeout(() => {
//   bars.data(DUMMY_DATA.slice(0, 2)).exit().remove();
// }, 2000);



  const countryData = {
    items: ['China', 'India', 'USA'],
    addItem(item) {
      this.items.push(item); 
    },
    removeItem(index) {
      this.items.splice(index, 1);
    },
    updateItem(index, newItem) {
      this.items[index] = newItem;
    }  
  }

  d3.select('#d3')
    .selectAll('li')
    .data(countryData.items, data => data)
    .enter()
    .append('li')
    .text(data => data);

  setTimeout(() => {
    countryData.addItem('Germany');
    d3.select('#d3')
      .selectAll('li')
      .data(countryData.items, data => data)
      .enter()
      .append('li')
      .classed('added', true)
      .text(data => data);
  }, 2000);

  setTimeout(() => {
    countryData.removeItem(0);
    d3.select('#d3')
      .selectAll('li')
      .data(countryData.items, data => data)
      .exit()
      .classed('redundant', true)
  }, 4000);

  setTimeout(() => {
    countryData.updateItem(1, 'Russia');
    d3.select('#d3')
      .selectAll('li')
      .data(countryData.items, data => data)
      .exit()
      .classed('updated', true)
      .text('Russia');
  }, 6000);