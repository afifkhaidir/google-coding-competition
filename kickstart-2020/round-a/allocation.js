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

function solve() {
  let [N, B] = readLine().split(' ').map(v => parseInt(v, 10));
  let A = readLine().split(' ').map(v => parseInt(v, 10)).sort((a, b) => a - b);

  return A.reduce((a, c) => {
    if (B >= c) {
      B -= c;
      return a + 1;
    }

    return a;
  }, 0);
}

function main() {
  let T = parseInt(readLine(), 10);
  let i = 1;

  while(T--) {
    const result = solve();
    console.log(`Case #${i}: ${result}`);
    ++i;
  }
}
