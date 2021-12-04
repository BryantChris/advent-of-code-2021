const fs = require('fs');
const readline = require('readline');

async function readFileLines() {
    const fileStream = fs.createReadStream('input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const lines = [];
    for await (const line of rl) {
        lines.push(line);
    }
    return lines;
}

const testData = [
    '00100',
    '11110',
    '10110',
    '10111',
    '10101',
    '01111',
    '00111',
    '11100',
    '10000',
    '11001',
    '00010',
    '01010'
];

class Node {
    constructor() {
        this.left = null;
        this.right = null;
        this.countLeft = 0;
        this.countRight = 0;
        this.val = 0;
    }
}

function addNode(base, st, val) {
    if (st.length === 0) {
        base.val = val;
        return;
    }
    if (st[0] === '1') {
        if (!base.right) {
            base.right = new Node();
        }
        addNode(base.right, st.slice(1), val);
        base.countRight += 1;
    } else {
        if (!base.left) {
            base.left = new Node();
        }
        addNode(base.left, st.slice(1), val);
        base.countLeft += 1;
    }
}

async function day3Part1(lines) {
    let countLines = 0;
    const countOnes = [];
    lines.forEach(line => {
        countLines += 1;
        for (let idx = 0; idx < line.length; idx++) {
            const char = line[idx];
            if (countOnes.length <= idx) {
                countOnes.push(0);
            }
            if (char === '1') {
                countOnes[idx] += 1;
            }
        }
    });
    console.log(countOnes);
    const bitPositions = countOnes.length - 1;
    let gamma = 0;
    let epsilon = 0;
    countOnes.forEach((oneCount, idx) => {
        const bitSet = (1 << (bitPositions - idx));
        if (oneCount > countLines - oneCount) {
            gamma |= bitSet;
        } else {
            epsilon |= bitSet;
        }
    });
    console.log(`gamma: ${gamma} epsilon: ${epsilon}`);
    return gamma * epsilon;
}

day3Part1(testData).then(result => console.log(`test case final result: ${result}`));
// readFileLines().then(lines => day3Part1(lines)).then(result => console.log(`result output from file: ${result}`));

function findRating(node, compareFn) {
    const nextNode = compareFn(node);
    if (!nextNode) {
        return node.val;
    }
    return findRating(nextNode, compareFn);
}

function findOGenRating(node) {
    if (node.countLeft === 0 && node.countRight === 0) {
        return null;
    }
    return node.countRight >= node.countLeft ? node.right : node.left;
}

function findCO2Rating(node) {
    if (node.countLeft === 0 && node.countRight === 0) {
        return null;
    }
    if (node.countLeft === 0) {
        return node.right;
    }
    if (node.countRight === 0) {
        return node.left;
    }
    return (node.countLeft <= node.countRight) ? node.left: node.right;
}

async function day3Part2(lines) {
    let countLines = 0;
    const root = new Node();
    lines.forEach(line => {
        countLines += 1;
        let val = 0;
        const bitPositions = line.length - 1;
        for (let idx = 0; idx < line.length; idx++) {
            const char = line[idx];
            if (char === '1') {
                const bitSet = (1 << (bitPositions - idx));
                val |= bitSet;
            }
        }
        addNode(root, line, val);
    });
    console.log('looking for oGen');
    const oGenRating = findRating(root, findOGenRating );
    console.log('looking for co2');
    const co2Rating = findRating(root, findCO2Rating );
    console.log(`Oxygen Rating: ${oGenRating} CO2 Scrubber Rating: ${co2Rating}`);
    return oGenRating * co2Rating;
}

day3Part2(testData).then(result => console.log(`test case 2 final result: ${result}`));
readFileLines().then(lines => day3Part2(lines)).then(result => console.log(`result output 2 from file: ${result}`));
