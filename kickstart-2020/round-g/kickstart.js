"use strict";

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", (inputStdin) => {
  inputString += inputStdin;
});

process.stdin.on("end", (_) => {
  inputString = inputString
    .replace(/\s*$/, "")
    .split("\n")
    .map((str) => str.replace(/\s*$/, ""));

  main();
});

function readLine() {
  return inputString[currentLine++];
}

function kickstart() {
  const str = readLine();
  const c = str.split('');
  let total = [];
  
  for (let j = 0; j < c.length; j++) {
    if (c[j] === 'K') {
      if (c.slice(j, j + 4).join('') === 'KICK') {
        total.push(0);
      }
    }
    if (c[j] === 'S') {
      if (c.slice(j, j + 5).join('') === 'START') {
        total = total.map(v => v + 1);
      }
    }
  }

  return total.length > 0 ? total.reduce((a, c) => a + c, 0) : 0;
}

function main() {
  let T = parseInt(readLine(), 10);
  let i = 1;

  while(T--) {
    const result = kickstart();
    console.log(`Case #${i}: ${result}`);
    ++i;
  }
}
