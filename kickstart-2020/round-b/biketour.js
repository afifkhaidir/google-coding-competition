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

function biketour() {
  const N = parseInt(readLine(), 10);
  const h = readLine().split(' ').map(v => parseInt(v, 10));
  let peak = 0;

  for (let i = 1, len = h.length; i < len - 1; i++) {
    if (h[i] > h[i - 1] && h[i] > h[i + 1]) {
      peak += 1;
    }
  }

  return peak;
}

function main() {
  let T = parseInt(readLine(), 10);
  let i = 1;

  while(T--) {
    const result = biketour();
    console.log(`Case #${i}: ${result}`);
    ++i;
  }
}
