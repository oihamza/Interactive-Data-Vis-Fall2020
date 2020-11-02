const width = window.innerWidth * 0.7;
const height = window.innerHeight * 0.7;
const margin = { top: 20, bottom: 50, left: 60, right: 40 };

let svg;
let state = {};

Promise.all([
            d3.json("../data/usStates.json"),d3.csv("../data/states.csv"), 
        ]).then( ([datageojson,dataheat])=>{
            state.datageojson = datageojson;
           state.dataheat= dataheat; 
            init();
        });
        
        function init() {
            svg=d3.select("#map")
            .append("svg")
            .attr("height",height)
            .attr("width",width)

const projection = d3.geoAlbersUsa()
  .fitSize([width, height], state.datageojson)

var path = d3.geoPath()
.projection(projection)
        svg.selectAll(".state")
           .data(state.datageojson.features)
           .enter().append("path")
           .attr("class","state")
          .attr("d",path) // this path came from projection that we set 
  
          .on('click',function(d){
  
              d3.select(this).classed("selected",true)
          })
          .on('mouseout',function(d){

            d3.select(this).classed("selected",true)
        })

svg.selectAll(".city-circle")
.data(state.dataheat)
.enter().append("circle")
.attr("r",2)
.attr("fill", "#EE2677")
.attr("cx",function (d){
    var coords = projection([d.Longitude,d.Latitude])

    
    return coords[0];
})
.attr("cy", function(d){
    var coords = projection([d.Longitude,d.Latitude])


   return coords[1];
})
         .on('mouseover',function(d){
  

            d3.select(this).classed("selected1",true)
          })
        
svg.selectAll(".state_label")
.data(state.dataheat)
.enter().append("text")
.attr("class","state_label")
.attr("x",function (d){
    var coords = projection([d.Longitude,d.Latitude])

    return coords[0];
})
.attr("y", function(d){
    var coords = projection([d.Longitude,d.Latitude])

   return coords[1];
})
.on('mouseover',function(d){

    d3.select(this).classed("selected2",true)
})
.on('mouseout',function(d){


  d3.select(this).classed("selected2",false)
})
.text(function(d){
    return d.City
})
.attr("dx",5)
.attr("dy",6)
          
        
}








// /**
//  * CONSTANTS AND GLOBALS
//  * */
// const width = window.innerWidth * 0.9,
//   height = window.innerHeight * 0.7,
//   margin = { top: 20, bottom: 50, left: 60, right: 40 };

// /** these variables allow us to access anything we manipulate in
//  * init() but need access to in draw().
//  * All these variables are empty before we assign something to them.*/
// let svg;

// /**
//  * APPLICATION STATE
//  * */
// let state = {
//   // + SET UP STATE
// };

// /**
//  * LOAD DATA
//  * Using a Promise.all([]), we can load more than one dataset at a time
//  * */
// Promise.all([
//   d3.json("PATH_TO_YOUR_GEOJSON"),
//   d3.csv("PATH_TO_ANOTHER_DATASET", d3.autoType),
// ]).then(([geojson, otherData]) => {
//   // + SET STATE WITH DATA
//   console.log("state: ", state);
//   init();
// });

// /**
//  * INITIALIZING FUNCTION
//  * this will be run *one time* when the data finishes loading in
//  * */
// function init() {
//   // create an svg element in our main `d3-container` element
//   svg = d3
//     .select("#d3-container")
//     .append("svg")
//     .attr("width", width)
//     .attr("height", height);

//   // + SET UP PROJECTION
//   // + SET UP GEOPATH

//   // + DRAW BASE MAP PATH
//   // + ADD EVENT LISTENERS (if you want)

//   draw(); // calls the draw function
// }

// /**
//  * DRAW FUNCTION
//  * we call this everytime there is an update to the data/state
//  * */
// function draw() {}
