let svg = d3
  .select(".container")
  .append("svg")
  .attr("height", window.innerHeight)
  .attr("width", window.innerWidth);

let squareData = {
  height: 35,
  width: 35,
  x: 0,
  y: 0,
  color: "blue",
  margin: 0,
};

svg
  .selectAll("rect")
  .data([squareData])
  .enter()
  .append("rect")
  .attr("height", (d) => d.height)
  .attr("width", (d) => d.width)
  .attr("fill", (d) => d.color)
  .attr("x", (d) => d.x)
  .attr("y", (d) => d.y)
  .attr("margin", (d) => d.margin);

setInterval(() => {
  let time = new Date();
  let h = time.getHours();
  let m = time.getMinutes();
  let s = time.getSeconds();
}, 1000);
