const svg = d3.select('svg');

svg.style('background-color', 'orange');

const height = +svg.attr('height');
const width = +svg.attr('width');

const circle = svg.append('circle')
    .attr('r', height / 3)
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .attr('fill', 'yellow')
    .attr('stroke', 'dark-orange');

const eyeSize = 25;
const eyeYOffset = -40;

const leftEye = svg.append('circle')
    .attr('r', eyeSize)
    .attr('cx', width / 2 + eyeYOffset)
    .attr('cy', height / 2 + eyeYOffset)
    .attr('fill', 'black')
    .transition().duration(2000)
        .attr('cy', 170)
    .transition().duration(2000)
        .attr('cy', height / 2 + eyeYOffset);

const rightEye = svg.append('circle')
    .attr('r', eyeSize)
    .attr('cx', width / 2 - eyeYOffset)
    .attr('cy', height / 2 + eyeYOffset)
    .attr('fill', 'black')
    .transition().duration(2000)
        .attr('cy', 170)
    .transition().duration(2000)
        .attr('cy', height / 2 + eyeYOffset);