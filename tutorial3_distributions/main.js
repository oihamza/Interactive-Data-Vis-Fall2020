/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 },
  radius = 5;

// these variables allow us to access anything we manipulate in init() but need access to in draw().
// All these variables are empty before we assign something to them.
let svg;
let xScale;
let yScale;

/* APPLICATION STATE */
let men = {
  data: [],
  selectedRegion: "All" // + YOUR FILTER SELECTION
};

/* LOAD DATA */
d3.csv("pop.csv", d3.autoType).then(raw_data => {
  // + SET YOUR DATA PATH
  console.log("raw_data", raw_data);
  men.data = raw_data;
  init();
});

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in 
function init() {
  // + SCALES
  xScale = d3
    .scaleLinear()
    .domain(d3.extent(men.data, d => d.life_expectancy_at_60_males))
    .range([margin.left, width - margin.right]);

  yScale = d3
    .scaleLinear()
    .domain(d3.extent(men.data, d => d.birth_rate_2017))
    .range([height - margin.bottom, margin.top]);

  // + AXES
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  // + UI ELEMENT SETUP

  const selectElement = d3.select("#dropdown").on("change", function() {
    console.log("Selected region is", this.value);
    // `this` === the selectElement
    // 'this.value' holds the dropdown value a user just selected

    men.selectedRegion = this.value
    console.log("New value is", this.value);
    draw(); // re-draw the graph based on this new selection
  });

  // add in dropdown options from the unique values in the data
  selectElement
    .selectAll("option")
    .data(["Globally", "Europe & Central Asia", "Sub-Saharan Africa", "East Asia & Pacific",
    "Latin America & Caribbean", "Middle East & North Africa", "South Asia", "North America"]) // + ADD UNIQUE VALUES
    .join("option")
    .attr("value", d => d)
    .text(d => d);

  // + CREATE SVG ELEMENT
  svg = d3
    .select("#d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // add the xAxis
  svg
    .append("g")
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(xAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("x", "50%")
    .attr("dy", "3em")
    .text("Life Expectancy at 60 for male");

  // add the yAxis
  svg
    .append("g")
    .attr("class", "axis y-axis")
    .attr("transform", `translate(${margin.left},0)`)
    .call(yAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("y", "50%")
    .attr("dx", "-3em")
    .attr("writing-mode", "vertical-rl")
    .text("Births for male in 2017");

  // + CALL AXES

  draw(); // calls the draw function
}

/* DRAW FUNCTION */
 // we call this everytime there is an update to the data/state
function draw() {
  
  // + FILTER DATA BASED ON STATE
  // filter the data for the selectedParty
  let filteredData = men.data;
  // if there is a selectedParty, filter the data before mapping it to our elements
  if (men.selectedRegion !== "World") {
    filteredData = men.data.filter(d => d.region === men.selectedRegion);
  }

  const dot = svg
    .selectAll(".dot")
    .data(filteredData, d => d.country) // use `d.name` as the `key` to match between HTML and data elements
    .join(
      enter =>
        // enter selections -- all data elements that don't have a `.dot` element attached to them yet
        enter
          .append("circle")
          .attr("class", "dot") // Note: this is important so we can identify it in future updates
          .attr("stroke", "white")
          .attr("opacity", 0.75)
          .attr("fill", d => {
            if (d.region === "Europe & Central Asia") return "#7F3C8D";
            else if (d.region === "Sub-Saharan Africa") return "#11A579";
            else if (d.region === "East Asia & Pacific") return "#3969AC";
            else if (d.region === "Latin America & Caribbean") return "#F2B701";
            else if (d.region === "Middle East & North Africa") return "#E73F74";
            else if (d.region === "South Asia") return "#80BA5A";
            else return "#E68310";
          })
          .attr("r", radius)
          .attr("cy", d => margin.top)
          .attr("cx", d => xScale(d.life_expectancy_at_60_males))
          .call(enter =>
            enter
              .transition() // initialize transition
              .delay(d => 5 * d.life_expectancy_at_60_males) // delay on each element
              .attr("cy", d => yScale(d.birth_rate_2017))
              .duration(250) // 250 ms
              .attr("r", 7)
              .transition()
              .duration(300)
              .ease(d3.easeBounce)
              .transition()
              .duration(400)
              .attr("r", 5)
          ),
      update =>
        update.call(update =>
          // update selections -- all data elements that match with a `.dot` element
          update
            .transition()
            .duration(250)
            .attr("stroke", "yellow")
        ),
      exit =>
        exit.call(exit =>
          // exit selections -- all the `.dot` element that no longer match to HTML elements
          exit
            .transition()
            .delay(d => 5 * d.life_expectancy_at_60_males)
            .duration(250)
            .attr("r", 7)
            .transition()
            .duration(250)
            .attr("fill", "#D3D3D3")
            .transition()
            .duration(300)
            .attr("r", 5)
            .attr("cy", height)
            .delay(d => 50 * d.life_expectancy_at_60_males)
            .remove()
        )
    );
}