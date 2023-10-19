// Define the data for the pie chart
const data = [
    { label: "Category A", value: 30 },
    { label: "Category B", value: 50 },
    { label: "Category C", value: 20 }
];

// Set up the dimensions and radius for the pie chart
const width = 400;
const height = 400;
const radius = Math.min(width, height) / 2;

// Create an SVG element
const svg = d3.select("#pie-chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

// Define the pie function
const pie = d3.pie()
    .value(d => d.value)
    .sort(null);

// Define the arc function
const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

// Create the pie chart slices
const slices = svg.selectAll("path")
    .data(pie(data))
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", (d, i) => d3.schemeCategory10[i]);

// Add labels to the pie chart slices
slices.append("text")
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .attr("text-anchor", "middle")
    .text(d => d.data.label);


    