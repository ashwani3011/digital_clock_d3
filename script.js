let svg = d3
  .select(".container")
  .append("svg")
  .attr("height", window.innerHeight)
  .attr("width", window.innerWidth);

// 3D data structure
let digits = [
  [
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ],
  [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [1, 1, 1],
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 1],
  ],
  [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
  ],
  [
    [1, 1, 1],
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 1, 1],
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
  ],
  [
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
  ],
];

let squareData = {
  height: 45,
  width: 45,
  x: 0,
  y: 0,
  color: "blue",
  margin: 5,
};

let makeDigit = (d) => {
  let digitData = [];
  // i - row, j - column
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 3; j++) {
      // making 21 digits
      let currSquare = { ...squareData };
      if (i > 0 && i < 6 && j == 1) {
        currSquare.color = "white";
      }
      currSquare.x = j * (currSquare.width + currSquare.margin) + d;
      currSquare.y = i * (currSquare.width + currSquare.margin);

      digitData.push(currSquare);
    }
  }
  return digitData;
};

// let digitData = makeDigit();

//creating 6 digits
let clockData = [];
let gap = 0;
for (let i = 0; i < 6; i++) {
  //creating a d factor which will handle x position of digits
  let d = i * (3 * (squareData.width + squareData.margin) + 10);
  if (i == 2 || i == 4) {
    gap += squareData.width;
  }
  clockData.push(makeDigit(d + gap));
}
// console.log(clockData);

// creating virtual object of 126objects so that we can have 6 digits
let virtualObject = [];
for (let i = 0; i < 6; i++) {
  virtualObject.push(svg.selectAll("rect").data(clockData[i]));
}
// renders six digit
let render = () => {
  for (let i = 0; i < 6; i++) {
    virtualObject[i]
      .enter()
      .append("rect")
      .data(clockData[i])
      .attr("height", (d) => d.height)
      .attr("width", (d) => d.width)
      .attr("fill", (d) => d.color)
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y)
      .attr("margin", (d) => d.margin);
  }
};
render();
// update single digit
let updateDigit = (digitData, s) => {
  for (let i = 0; i < 21; i++) {
    let r = Math.floor(i / 3);
    let c = i % 3;

    if (digits[s][r][c] === 1) {
      digitData[i].color = "blue";
    } else {
      digitData[i].color = "white";
    }
  }
};
//update all 6 digit
let updateAllDigit = (h, m, s) => {
  updateDigit(clockData[0], Math.floor(h / 10));
  updateDigit(clockData[1], h % 10);
  updateDigit(clockData[2], Math.floor(m / 10));
  updateDigit(clockData[3], m % 10);
  updateDigit(clockData[4], Math.floor(s / 10));
  updateDigit(clockData[5], s % 10);
};
setInterval(() => {
  let time = new Date();
  let h = time.getHours();
  let m = time.getMinutes();
  let s = time.getSeconds();
  //   updateDigit(s % 10);
  //   render();

  updateAllDigit(h % 12, m, s);
  render();
}, 1000);
