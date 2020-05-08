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

function sumArray(arr) {
  return arr.reduce((a, c) => a + c, 0);
}

function solve() {
  let [N, K, P] = readLine().split(' ').map(v => parseInt(v, 10));
  let iter = N;
  let val = [];
  let wt = [];
  let ks = new Array((N * K) + 1).fill(0).map(() => new Array(P + 1).fill(0));

  while(iter--) {
    const kum = readLine().split(' ').map(v => parseInt(v, 10)).reduce((a, c) => {
      return [...a, c + (a.slice(-1)[0] || 0)]
    }, []);
    val = [...val, ...kum];
    wt = [...wt, 1, 2, 3, 4];
  }

  for (let i = 0; i <= (N * K); i++) {
    for (let w = 0; w <= P; w++) {
      if (i === 0 || w === 0) {
        ks[i][w] = 0;
      } else if (wt[i - 1] <= w) {
        ks[i][w] = Math.max(
          val[i - 1] + ks[i - 1][w - wt[i - 1]], // included
          ks[i - 1][w] //excluded
        )
      } else {
        ks[i][w] = ks[i - 1][w]
      }
    }
  }

  return ks[N * K][P];
  // return JSON.stringify(ks);
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
