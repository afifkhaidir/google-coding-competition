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

// encode to plain string
function dec(p) {
  let openB = []; // opening bracket index
  let count = []; // number before bracket
  let stored = {};
  let program = '';

  for (let i = 0, len = p.length; i < len; i++) {
    if (p[i].match(/\d/)) {
      continue;
    }
    if (p[i] === '(') {
      openB.push(i);
      count.push(parseInt(p[i - 1], 10));
      stored[i] = [];
      continue;
    }
    if (p[i] === ')') {
      let start = openB.pop();
      let mul = count.pop();
      let str = new Array(mul).fill(stored[start].join('')).join('');

      if (openB[openB.length - 1]) {
        stored[openB[openB.length - 1]] = [...stored[openB[openB.length - 1]], str];
      } else {
        program += str;
      }
      continue;
    }
    if (openB[openB.length - 1]) {
      stored[openB[openB.length - 1]] = [...stored[openB[openB.length - 1]], p[i]];
      continue;
    }
    program += p[i];
  }

  return program;
}

function robotpath() {
  const MAX = 1e9;
  let w = 1;
  let h = 1;
  const p = readLine().split('');
  
  dec(p).split('').forEach(v => {
    switch(v) {
      case 'N':
        h = (h - 1) || MAX;
        break;
      case 'S':
        h = (h + 1 <= MAX ? h + 1 : 1);
        break;
      case 'W':
        w = (w - 1) || MAX;
        break;
      case 'E':
        w = (w + 1 <= MAX ? w + 1 : 1);
        break;
      default:
        break;
    }
  });

  return [w, h];
}

function main() {
  let T = parseInt(readLine(), 10);
  let i = 1;

  while(T--) {
    const [w, h] = robotpath();
    console.log(`Case #${i}: ${w} ${h}`);
    ++i;
  }
}
