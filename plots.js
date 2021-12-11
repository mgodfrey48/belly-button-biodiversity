// This code is taken from Dom's office hours session on 12/11

console.log("plots.js loaded")

// Function to draw the barchart
function drawBarchart(sampleID) {
    console.log(`DrawBarchart(${sampleID})`);
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
        console.log(data);

        let sampleNames = data.names;

        sampleNames.forEach(sampleID => {
            selector.append("option")
                .text(sampleID)
                .property("value", sampleID)
        })

        let sampleID = sampleNames[0];

        populateDemographics(sampleID);
        drawBarchart(sampleID);
        drawBubblechart(sampleID);
    });

}

InitDashboard();
