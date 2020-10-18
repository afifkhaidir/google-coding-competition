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

function countdown() {
  const [N, K] = readLine().split(' ').map(v => parseInt(v, 10));
  const A = readLine().split(' ').map(v => parseInt(v, 10));
  let count = 0;
  let next = K;

  for (let i = 0; i < N; i++) {
    if (A[i] === next) {
      if (next === 1) {
        count++;
        next = K;
        continue;
      }
      next--;
      continue;
    }
    if (A[i] === K) {
      next = K - 1;
      continue;
    }
    next = K;
  }

  return count;
}

function main() {
  let T = parseInt(readLine(), 10);
  let i = 1;

  while(T--) {
    const result = countdown();
    console.log(`Case #${i}: ${result}`);
    ++i;
  }
}
