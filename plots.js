// This code is taken from Dom's office hours session on 12/11

console.log("plots.js loaded")

// Function to draw the barchart
function drawBarchart(sampleID) {
    console.log(`DrawBarchart(${sampleID})`);

    d3.json("samples.json").then(data => {
        
        let samples = data.samples;
        let resultArray = samples.filter(s => s.id === sampleID);
        let result = resultArray[0];
        console.log(result);

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        console.log(sample_values)

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
}

// Function to populate the demographic info
function populateDemographics(sampleID) {
    console.log(`Showing demographic data ${sampleID}`);
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

        populateDemographics(sampleID);
        drawBarchart(sampleID);
        drawBubblechart(sampleID);
    });

}

InitDashboard();
