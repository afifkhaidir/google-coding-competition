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

const MAX = 1e9;

function xmove(arr, dir) {
  switch(dir) {
    case 'N': return [arr[0], (arr[1] - 1 || MAX)];
    case 'S': return [arr[0], (arr[1] + 1 <= MAX ? arr[1] + 1 : 1)];
    case 'E': return [(arr[0] + 1 <= MAX ? arr[0] + 1 : 1), arr[1]];
    case 'W': return [(arr[0] - 1 || MAX), arr[1]];
    default: return arr;
  }
}

function xmul(arr, mul) {
  return arr.map(v => v * mul);
}

function xadd(arr1, arr2) {
  return arr1.map((v, i) => v + arr2[i]);
}

function xaddpos(pos, mv) {
  return pos.map((v, i) => {
    const res = v + mv[i];

    if (res > MAX) {
      return (res - Math.abs(Math.floor(res / MAX)) * MAX) || MAX;
    } else if (res < 1) {
      return (res + Math.abs(Math.floor(res / MAX)) * MAX) || MAX;
    }
    return res;
  });
}

function robotpath() {
  const mul = [];
  const mv = [];
  const p = readLine().split('');

  let pos = [1, 1];
  
  for (let i = 0; i < p.length; i++) {
    if (p[i].match(/\d/)) {
      continue;
    }
    if (p[i] === '(') {
      mv.push([0, 0]);
      mul.push(parseInt(p[i - 1], 10));
      continue;
    }
    if (p[i] === ')') {
      const mvx = mv.pop();
      const mulx = mul.pop();

      if (mv.length === 0) {
        pos = xaddpos(pos, xmul(mvx, mulx));
        continue;
      }
      mv.push(xadd(mv.pop(), xmul(mvx, mulx)));
      continue;
    }

    // the rest must be ['N', 'W', 'E', 'S']
    if (mv.length === 0) {
      pos = xmove(pos, p[i]);
      continue;
    }
    mv.push(xmove(mv.pop(), p[i]));
  }

  return pos;
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
