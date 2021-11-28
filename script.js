let svg = d3
  .select(".container")
  .append("svg")
  .attr("height", window.innerHeight)
  .attr("width", window.innerWidth);

let squareData = {
  height: 45,
  width: 45,
  x: 0,
  y: 0,
  color: "blue",
  margin: 5,
};

let makeDigit = () => {
  let digitData = [];
  // i - row, j - column
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 3; j++) {
      // making 21 digits
      let currSquare = { ...squareData };
      if (i > 0 && i < 6 && j == 1) {
        currSquare.color = "white";
      }
      currSquare.x = j * (currSquare.width + currSquare.margin);
      currSquare.y = i * (currSquare.width + currSquare.margin);

      digitData.push(currSquare);
    }
  }
  return digitData;
};

let render = () => {
  let digitData = makeDigit();
  svg
    .selectAll("rect")
    .data(digitData)
    .enter()
    .append("rect")
    .attr("height", (d) => d.height)
    .attr("width", (d) => d.width)
    .attr("fill", (d) => d.color)
    .attr("x", (d) => d.x)
    .attr("y", (d) => d.y)
    .attr("margin", (d) => d.margin);
};
render();

setInterval(() => {
  let time = new Date();
  let h = time.getHours();
  let m = time.getMinutes();
  let s = time.getSeconds();
}, 1000);
