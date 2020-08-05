# Belly Button Biodiversity Dashboard
In this project, we are going to explore the data provided by [Belly Button Biodiversity DataSet](http://robdunnlab.com/projects/belly-button-biodiversity/) and create an interactive dashboard using `Plotly.js`.

## Preparation
Install `pip install -r requirements.txt` before you start the server.

## Steps of Charts
1. Create a PIE chart that uses data from your samples route (`/samples/<sample>`) to display the top 10 samples.

   * Use `sample_values` as the values for the PIE chart.

   * Use `otu_ids` as the labels for the pie chart.

   * Use `otu_labels` as the hovertext for the chart.

2. Create a Bubble Chart that uses data from your samples route (`/samples/<sample>`) to display each sample.

   * Use `otu_ids` for the x values.

   * Use `sample_values` for the y values.

   * Use `sample_values` for the marker size.

   * Use `otu_ids` for the marker colors.

   * Use `otu_labels` for the text values.

3. Display the sample metadata from the route `/metadata/<sample>`

   * Display each key/value pair from the metadata JSON object somewhere on the page.

4. Deploy the Flask app to Heroku
