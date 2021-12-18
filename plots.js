// This code is taken from Dom's office hours session on 12/11

console.log("plots.js loaded")

// Function to draw the barchart
function drawBarchart(sampleID) {
    console.log(`DrawBarchart(${sampleID})`);

    d3.json("samples.json").then(data => {
        
        let samples = data.samples;
        let resultArray = samples.filter(s => s.id === sampleID);
        let result = resultArray[0];

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        let yticks = otu_ids.slice(0,10).map(otuID => `OTU${otuID}`).reverse();
        let barData = {
            x: sample_values.slice(0,10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0,10).reverse(),
            orientation: "h"
        }

        let barTrace = [barData]

        let barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}
        }

        Plotly.newPlot("bar", barTrace, barLayout)
    });
}

// Function to draw the bubble chart
function drawBubblechart(sampleID) {
    console.log(`DrawBubblechart(${sampleID})`);

    d3.json("samples.json").then(data => {

        let samples = data.samples;
        let resultArray = samples.filter(s => s.id === sampleID);
        let result = resultArray[0];

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;
        
        let bubbleData = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids
            },
            text: otu_labels 
        };

        let bubbleTrace = [bubbleData];

        let bubbleLayout = {
            title: "Sample Counts",
            xaxis: {
                title: "OTU ID"
            }
        }
        Plotly.newPlot("bubble", bubbleTrace, bubbleLayout);
    });
}

// Function to populate the demographic info
function populateDemographics(sampleID) {
    console.log(`Showing demographic data for sample ${sampleID}`);

    d3.json("samples.json").then(data => {
        
        let metadata = data.metadata;
        let resultArray = metadata.filter(s => s.id === parseInt(sampleID));
        let result = resultArray[0];

        // Clear the html for the current panel to be replaced with new sample info
        let panel = d3.select("#sample-metadata");
        panel.html("")

        // Append a h6 tag in the panel for each [key, value] pairing
        Object.entries(result).forEach(([key, value]) => {
            let listItem = panel.append("h6");
            listItem.text(`${key}: ${value}`);
        });
    });
}

function drawGauge(sampleID) {
    console.log(`Draw gauge for ${sampleID}`);

    d3.json("samples.json").then(data => {
        let metadata = data.metadata;
        let resultArray = metadata.filter(s => s.id === parseInt(sampleID));
        let result = resultArray[0];

        let gaugeData = {
                domain: { x: [0, 9], y: [0, 9]},
                value: result.wfreq,
                title: { text: "Belly Button Washes Per Week" },
                subtitle: "Scrubadubdub",
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    axis: { range: [null, 9] },
                    steps: [
                      { range: [0, 1], color: "#e6faff" },
                      { range: [1, 2], color: "#ccf5ff" },
                      { range: [2, 3], color: "#b3f0ff" },
                      { range: [3, 4], color: "#99ebff" },
                      { range: [4, 5], color: "#80e5ff" },
                      { range: [5, 6], color: "#66e0ff" },
                      { range: [6, 7], color: "#4ddbff" },
                      { range: [7, 8], color: "#33d6ff" },
                      { range: [8, 9], color: "#1ad1ff"}
                    ],
                }
            };

        let gaugeTrace = [gaugeData]
        let layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', gaugeTrace, layout);
    });
}

// Event handler
function optionChanged(id) {
    console.log(`optionChanged(${id})`);

    // Populate demographic info
    populateDemographics(id);
    // Display the barchart
    drawBarchart(id);
    // Display the bubble chart
    drawBubblechart(id);
    // Display the gauge
    drawGauge(id);
}

// Initialize the dashboard
function InitDashboard() {
    console.log("Initializing dashboard")

    let selector = d3.select("#selDataset");
    d3.json("samples.json").then(data => {

        let sampleNames = data.names;

        sampleNames.forEach(sampleID => {
            selector.append("option")
                .text(sampleID)
                .property("value", sampleID);
        });

        let sampleID = sampleNames[0];

        // Populate the demographics table and draw the charts
        populateDemographics(sampleID);
        drawBarchart(sampleID);
        drawBubblechart(sampleID);
        drawGauge(sampleID);
    });
}

InitDashboard();
