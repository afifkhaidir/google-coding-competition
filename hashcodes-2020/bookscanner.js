const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function myFunc(T, data) {
    const result = data
        .map(val => knapsack(val.B, val.A))
        .map(({ val }, i) => `Case #${i + 1}: ${val}`)
        .join('\n');
    
    console.log(result.replace(/\n*$/, ''));
}

function greedy(B, houses) {
    const sorted = houses.sort();
    return sorted.reduce((a, c) => {
        const sum = a.total + c;
        return sum <= B
            ? { total: sum, count: a.count + 1 }
            : a;
    }, { total: 0, count: 0 });
}

function knapsack(B, houses) {
    let ks = [...new Array(houses.length + 1)].map(() => [...new Array(B + 1)]);
    
    for (let n = 0; n <= houses.length; n++) {
        for (let b = 0; b <= B; b++) {
            if (n === 0 || b === 0) {
                ks[n][b] = { val: 0, items: 0 };
            }
            else if (houses[n - 1] <= b) {
                const inc = ks[n - 1][b - houses[n - 1]].val + 1;
                const exc = ks[n - 1][b].val;
                
                ks[n][b] = inc > exc
                    ? { val: inc, items: ks[n - 1][b - houses[n - 1]].items + 1 }
                    : { val: exc, items: ks[n - 1][b].items }
            }
            else {
                ks[n][b] = { val: ks[n - 1][b].val, items: ks[n - 1][b].items };
            }
        }
    }
    
    return ks[houses.length][B];
}

function main() {
    const T = parseInt(inputString[0], 10);
    const data = inputString.slice(1).reduce((a, c, i) => {
        const input = c.split(' ').filter(Boolean).map(v => parseInt(v, 10));
        
        if (i % 2 === 0) {
            return [...a, { N: input[0], B: input[1]}];
        }
        
        const last = a.slice(-1)[0];
        const rest = a.slice(0, -1);
        
        return [...rest, { ...last, A: input }];
    }, []);
    myFunc(T, data);
}