let svg = d3
  .select(".container")
  .append("svg")
  .attr("height", window.innerHeight)
  .attr("width", window.innerWidth);

setInterval(() => {
  let time = new Date();
  let h = time.getHours();
  let m = time.getMinutes();
  let s = time.getSeconds();
}, 1000);
