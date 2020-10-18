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

function alienPiano() {
  const K = parseInt(readLine(), 10);
  const A = readLine().split(' ').map(v => parseInt(v, 10));
  let higherPitch = 0;
  let lowerPitch = 0;
  let totalBreak = 0;

  for (let i = 0; i < A.length; i++) {
    if (i === 0) {
      continue;
    }

    if (A[i] > A[i - 1]) {
      higherPitch++;

      if (higherPitch === 4) {
        totalBreak++;
        higherPitch = 0;
      }

      if (lowerPitch > 0) {
        lowerPitch = 0;
      }
    }

    if (A[i] < A[i - 1]) {
      lowerPitch++;

      if (lowerPitch === 4) {
        totalBreak++;
        lowerPitch = 0;
      }

      if (higherPitch > 0) {
        higherPitch = 0;
      }
    }
  }

  return totalBreak;
}

function main() {
  let T = parseInt(readLine(), 10);
  let i = 1;

  while(T--) {
    const result = alienPiano();
    console.log(`Case #${i}: ${result}`);
    ++i;
  }
}
