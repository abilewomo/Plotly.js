//X(Dates) is constant for all sectors so pick any of the X values for the
const xAxis = CAGR["Basic Materials"]["X"];
var field = document.querySelector("select").value;
//Function to plot a multi-line chart
function multipleCharts() {
  //get the value for the type of chart that should be plotted
  let chartMode = document.getElementById("chart").value;
  //create an empty array for the trace values
  let dataArray = [];

  //loop through the dataset to extract the sector names and corresponding X and Y values for each sector
  //Dataset is an object of objects assigned to variable CAGR in cagr.js
  for (const [sectorName, sectorDataset] of Object.entries(CAGR)) {
    dataArray.push({
      x: xAxis,
      y: sectorDataset.Y,
      mode: chartMode,
      type: "scatter",
      name: sectorName,
    });
  }
  //call the plotChart function to plot the chart
  //plotChart functions accepts an array of all trace values, Graph title and y-axis title
  plotChart(dataArray, "Multi-Line Graph", "Sectors");
}

//Function to plot a single chart
function singleChart() {
  //get the sector name
  let sector = document.getElementById("sectors").value;
  //get the value for the type of chart that should be plotted
  let singleChartMode = document.getElementById("chart").value;

  //if  sector is an empty string, then plot a multiline chart by calling the multipleCharts function
  if (sector == "") {
    multipleCharts();
  } else {
    //if sector is not an empty string, extract corresponding Y values from the dataset using the sector name
    let myData = [
      {
        x: xAxis,
        y: CAGR[sector]["Y"],
        mode: singleChartMode,
        type: "scatter",
        name: sector,
      },
    ];
    //plot the single chart by calling the plot chart function
    plotChart(myData, sector + " Chart", sector);
  }
}

//plotChart function to plot charts
function plotChart(data, mainTitle, yTitle) {
  // Define the layout
  var layout = {
    title: mainTitle,
    xaxis: {
      title: "Dates",
    },
    yaxis: {
      title: yTitle,
    },
  };

  // Create the graph
  Plotly.newPlot("myGraph", data, layout);
}
document.addEventListener("change", singleChart)