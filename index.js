import {
	format
} from 'd3';

const svg = d3.select("svg");

const width = svg.attr("width");
const height = svg.attr("height");



const render = data => {
  const xValue = d => d.population;
  const yValue = d => d.Country;  
  
  const margin = {top: 80, right: 40, bottom: 90, left: 180};
  
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  
  const xScale = d3.scaleLinear()
  			.domain([0, d3.max(data, d => xValue(d))])
  			.range([0, innerWidth]); 
  
  const xAxisTickFormat = number => format('.3s')(number)
  																	.replace("G", "B");
	const xAxis = d3.axisBottom(xScale)
  								.tickFormat(xAxisTickFormat)
  								.tickSize(-innerHeight);
  
  const yScale = d3.scaleBand()
  			.domain(data.map(d => yValue(d)))
  			.range([0, innerHeight])
  			.padding(0.2);
  
  const g = svg.append("g")
  						.attr("transform",`translate(${margin.left}, ${margin.top})`);
  
  const yAxisG = g.append("g")
    .call(d3.axisLeft(yScale))
  	.selectAll(".domain, .tick line")
  		.remove();
  
  const xAxisG = g.append("g")
    .call(xAxis)
  		.attr('transform', `translate(0, ${innerHeight})`);
  
  xAxisG.select(".domain").remove();
  
  xAxisG.append("text")
  		.attr("class", "axis-lable")
  		.attr("y",65)
  		.attr("x", innerWidth / 2)
  		.text("Population");
  							
  
	g.selectAll('rect').data(data)
  	.enter().append('rect')
  		.attr("y", d => yScale(yValue(d)))
  		.attr("width", d => xScale(xValue(d)))
  		.attr("height", yScale.bandwidth());
  
  g.append("text")
  	.attr("class", "title")
  	.text("Top 10 Most Populous Countries");
};

d3.csv('data.csv').then(data => {
	data.forEach(d => {d.population = +d.population * 1000});  
	render(data);
  
  
});


