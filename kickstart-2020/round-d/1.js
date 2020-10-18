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

function recordBreaker() {
  const N = parseInt(readLine(), 10);
  const V = readLine().split(' ').map(v => parseInt(v, 10));
  let record = V[0];
  let numDays = 0;

  if (V.length === 1) {
    return 1;
  }

  for (let i = 0; i < V.length; i++) {
    if (i === 0 && V[i] > V[i + 1]) {
      record = V[i];
      numDays++;
      continue;
    }
    if (V[i] > record) {
      if (i === V.length - 1 || V[i] > V[i + 1]) {
        record = V[i];
        numDays++;
        continue;
      }
    }
  }

  return numDays;
}

function main() {
  let T = parseInt(readLine(), 10);
  let i = 1;

  while(T--) {
    const result = recordBreaker();
    console.log(`Case #${i}: ${result}`);
    ++i;
  }
}
