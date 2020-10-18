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

function subarray() {
  const N = parseInt(readLine(), 10);
  const A = readLine().split(' ').map(v => parseInt(v, 10));
  let sum = 0;
  let count = 0;

  for (let i = 0; i < N; i++) {
    sum = 0;
    for (let j = i; j < N; j++) {
      sum += A[j];
      if (Math.sqrt(sum) % 1 === 0) {
        count++;
      }
    }
  }
  return count;
}

function main() {
  let T = parseInt(readLine(), 10);
  let i = 1;

  while(T--) {
    const result = subarray();
    console.log(`Case #${i}: ${result}`);
    ++i;
  }
}
