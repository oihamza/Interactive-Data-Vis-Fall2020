// console.log("hi");



// d3.csv("../data/surveyResults.csv").then(data =>{



// const body = d3.selectAll("#d3-table")
// .append("tbody")
// .attr("id","2")



// const rows = body.selectAll(".row")
// .data(data)
// .join("tr")
// .attr("class","row");

// const cells = rows
// .append("td")
// .style("color","darkBlue")
// .style("background","orange")
// .style("border-radius","5px")
// .text(d => d.Timestamp)


// })





// const div = d3.select('.parent')
// .attr("class","container")
// .style("background-color","yellow")
// .append("span")
// .text("Hellooooo")

// load in csv




d3.csv("../data/countries-internet.csv").then(data => {
    // once the data loads, console log it
    console.log("data", data);
  
    // select the `table` container in the HTML
    const table = d3.select("#d3-table");
  
    /** HEADER */
    const thead = table.append("thead");
    thead
      .append("tr")
      .append("th")
      .attr("colspan", "2")
    //   .style("color","darkBlue")
      .style("background","darkOrange")
      .style("border-radius","6.5px")
      .text("Countries with the higest internet users!");

  
    thead
      .append("tr")
      .style("background","Orange")
      .style("text-align","center")
      .selectAll("th")
      .data(data.columns)
      .join("td")
      .text(d => d);
  
    /** BODY */
    // rows
    // "Country"
    // "Internet users"
    

    const rows = table
      .append("tbody")
      .style("background","lightGray")
      .style("text-align","center")
      .selectAll("tr")
      .data(data)
      .join("tr");
  



    // cells
    rows
      .selectAll("td")
      .data(d => Object.values(d))
      .join("td")
      // update the below logic to apply to your dataset
      .style("background-color", d => d > 2000000 ? 'lightgreen' : null)
      .text(d => d);
  });


  
d3.select("body")
.append("div")
.attr("class","source")
d3.select(".source")
.append("a")
.attr("href", "https://perso.telecom-paristech.fr/eagan/class/igr204/datasets")
.text("Source: Dataset of 160 countries and Internet users.")



document.getElementById("scroll-to-bottom").addEventListener("click", function () {
    document.body.scrollIntoView(false);
  });