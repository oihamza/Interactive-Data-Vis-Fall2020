d3.csv("../data/myQuarantineLog.csv", d3.autoType).then(data => {
    console.log(data);
  
    /** CONSTANTS */
    // constants help us reference the same values throughout our code
    const width = window.innerWidth * 0.9,
      height = window.innerHeight / 2,
      paddingInner = 0.2,
      margin = { top: 20, bottom: 40, left: 100, right: 100 };
  
    /** SCALES */
    // reference for d3.scales: https://github.com/d3/d3-scale
    

    const yScale = d3
      .scaleBand()
      .domain(data.map(d => d.activity))
      .range([height - margin.bottom, margin.top])
      .paddingInner(paddingInner);
  
      const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.count)])
      .range([width - margin.left, margin.right]);
     

    // reference for d3.axis: https://github.com/d3/d3-axis
    const yAxis = d3.axisLeft(yScale).ticks(data.length);
  
    /** MAIN CODE */
    const svg = d3
      .select("#d3-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
  
    // append rects
    const rect = svg
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", 0, d => xScale(d.count))
      .attr("y", d => yScale(d.activity))
      .attr("height", yScale.bandwidth())
      .attr("width", d => width - margin.left - xScale(d.count))
      .attr("transform", `translate(200, ${height - margin.bottom, margin.top})`)
      .attr("fill", "black");
   
      const text = svg
      .selectAll("text")
      .data(data)
      .join("text")
      .attr("class", "label")
      .attr("y", d => yScale(d.activity) + (yScale.bandwidth()+15))
      .attr("x", 0, d => xScale(d.count))
      .text(d => d.count)
      .attr("dx", "220")
      .attr("fill", "white");




  
    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(195, ${height - margin.bottom, margin.top})`)
      .call(yAxis)
      .style("text-anchor", "left")
      .text(d.activity);
  });

// svg
// .append("g")
// .attr("class", "axis")
// .attr("transform",`translate(${margin.left})`)
// .call(yAxis)











// // data load
// // reference for d3.autotype: https://github.com/d3/d3-dsv#autoType
// d3.csv("../data/myQuarantineLog.csv", d3.autoType).then(data => {
//     console.log(data);
  
// const width = window.innerWidth * 0.9,
// height = window.innerHeight / 3,
// paddingInner = 0.4,
// margin = { top: 20, bottom: 20, left: 400, right: 40 };

// const yScale = d3
// .scaleBand()
// .domain(data.map(d=>d.activity))
// .range([height-margin.bottom,margin.top])
// .paddingInner(paddingInner)

// const xScale = d3
// .scaleLinear()
// .domain([0,d3.max(data,d=>d.count)])
// .range([margin.left, width-margin.right])



// const svg = d3
// .select("#d3-container")
// .append("svg")
// .attr("width",width)
// .attr("height",height)


// const rect = svg
// .selectAll("rect")
// .data(data)
// .join("rect")
// .attr("x", d=> xScale(0))
// .attr("y", d=>yScale(d.activity))
// .attr("width",d=> xScale(d.count))
// .attr("height",yScale.bandwidth())
// .attr("fill","black")

//     // append text
//     const text = svg
//       .selectAll("text")
//       .data(data)
//       .join("text")
//       .attr("class", "label")
//       // this allows us to position the text in the center of the bar
//       .attr("y", d => yScale(d.activity) + (yScale.bandwidth()+15))
//       .attr("x", 0, d => xScale(d.count))
//       .text(d => d.count)
//       .attr("dx", "900")
//       .attr("fill", "black");
      


// const yAxis= d3.axisLeft(yScale)

// svg
// .append("g")
// .attr("class", "axis")
// .attr("transform",`translate(${margin.left})`)
// .call(yAxis)

// })


  