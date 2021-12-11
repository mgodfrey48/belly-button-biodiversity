// This code is taken from Dom's office hours session on 12/11

console.log("plots.js is running")


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
    })

}

InitDashboard();