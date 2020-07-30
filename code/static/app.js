function buildMetadata(sample) {
    // Use `d3.json` to fetch the metadata for a sample
    var url = "/metadata/" + sample;

    // Use d3 to select the panel with id of `#sample-metadata`
    var sampleMetadata = d3.select("#sample-metadata");

    // Use `.html("")` to clear any existing metadata
    sampleMetadata.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, use d3 to append new tags for each key-value in the metadata
    d3.json(url).then(function(data) {
        Object.entries(data).forEach(([key, value]) => {
            sampleMetadata.append("h5").text(`${key}: ${value}`);
        });

        // Build the gauge chart: buildGauge(data.WFREQ)
        var data = [{domain: {x: [0, 1], y:[0, 1]}, value:data.WFREQ,
            title: {text: "Belly Button Washing Frequency Scrubs per Week", font: {size:13}},
            type: "indicator", mode: "gauge+number+delta",
            delta: {reference: 9, increasing: {color: "green"}},
            gauge:
                {axis: {range: [0, 10]}, steps: [{range: [0, 5], color: "lightgray"},
                {range: [5, 8], color: "gray"}], threshold: {line: {color: "red", width: 4},
                thinkness: 0.75, value: 9}}}];
        
        var gaugePlot = {width: 400, height: 500, margin: {t:0, b:0}};
        Plotly.newPlot("gauge", data, gaugePlot);
    });
}

function buildChart(sample) {
    // Use `d3.json` to fetch the sample data for plots
    var chartURL = "/samples/" + sample;
    d3.json(chartURL).then((data) => {
        // Build a bubble chart using the sample data
        var trace1 = {
            x: data.otu_ids,
            y: data.sample_values,
            mode: 'markers',
            text: data.otu_labels,
            marker: {
                color: data.otu_ids,
                size: data.sample_values,
                colorscale: "Earth"
            }
        };

        var trace1 = [trace1];
        var layout1 = {
            title: "OTU ID",
            showlegend: false,
            height: 600,
            width: 1500
        };
        Plotly.newPlot("bubble", trace1, layout1);

        // Build a pie chart using `slice()` to grab the top 10 sample values
        var trace2 = [{
            values: data.sample_values.slice(0, 10),
            labels: data.otu_ids.slice(0, 10),
            hovertext: data.otu_labels.slice(0, 10),
            type: "pie",
            marker: {
                colorscale: "Earth"
            }
        }];

        var layout2 = {
            showlegend: true,
            height: 400,
            width: 500
        };
        Plotly.newPlot("pie", trace2, layout2);
    });
}

function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");

    // Use the list of sample names to populate the selected options
    d3.json("/names").then((sampleName) => {
        sampleName.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });

        // Use the 1st sample from the list to build the initial plots
        const firstSample = sampleName[0];
        buildChart(firstSample);
        buildMetadata(firstSample);
        console.log(firstSample)
    });
}

function optionChanged(newSample) {
    // Fetch new data each time a new sample is chose
    buildChart(newSample);
    buildMetadata(newSample);
}

init();