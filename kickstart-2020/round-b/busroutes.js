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

function busroutes() {
  const [N, D] = readLine().split(' ').map(v => parseInt(v, 10));
  const x = readLine().split(' ').map(v => parseInt(v, 10));
  let maxMod = 0; // the highes
  let iMod = 0; // x index that has highest modulos 
  
  for (let i = 0, len = x.length; i < len; i ++) {
    let mod = D % x[i];
    if (mod >= maxMod) {
      maxMod = mod;
      iMod = i;
    }
  }

  let iDay = Math.floor(D / x[iMod]) * x[iMod];

  for (let i = iMod; i >= 0; i--) {
    iDay = Math.floor(iDay / x[i]) * x[i];
  }

  return iDay;
}

function main() {
  let T = parseInt(readLine(), 10);
  let i = 1;

  while(T--) {
    const result = busroutes();
    console.log(`Case #${i}: ${result}`);
    ++i;
  }
}
