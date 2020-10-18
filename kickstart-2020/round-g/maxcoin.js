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

function maxcoin() {
  const N = parseInt(readLine(), 10);
  const counter = {};
  for (let i = 0; i < N; i++) {
    const C = readLine().split(' ').map(v => parseInt(v, 10));
    for (let j = 0; j < N; j++) {
      if (counter[i - j]) {
        counter[i - j] += C[j];
      } else {
        counter[i - j] = C[j];
      }
    }
  }

  return Object.keys(counter).reduce((a, c) => counter[c] > a ? counter[c] : a, 0);
}

function main() {
  let T = parseInt(readLine(), 10);
  let i = 1;

  while(T--) {
    const result = maxcoin();
    console.log(`Case #${i}: ${result}`);
    ++i;
  }
}
