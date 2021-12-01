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
        console.log(`Line from file: ${line}`);
        lines.push(line);
    }
    return lines;
}

async function day1Part1(lines) {
    let lastVal = 0;
    let increases = 0;
    lines.forEach(line => {
        const currentVal = parseInt(line, 10);
        if (lastVal > 0) {
            if (currentVal > lastVal) {
                increases += 1;
            }
        }
        lastVal = currentVal;
    });
    return increases;
}

const testData = [
    199,
    200,
    208,
    210,
    200,
    207,
    240,
    269,
    260,
    263
];

async function day1Part2(lines) {
    const windows = [0, 0, 0];
    let increases = 0;
    let lineNumber = 0;
    let lastWindowSum = 0;
    lines.forEach(line => {
        const currentVal = parseInt(line, 10);
        windows[0] += currentVal;
        if (lineNumber > 0) {
            windows[1] += currentVal;
        }
        if (lineNumber > 1) {
            windows[2] += currentVal;
        }
        if (lineNumber >= 2) {
            const windowEnding = (lineNumber + 1) % 3;
            const currentWindowSum = windows[windowEnding];
            if (lineNumber >= 3) {
                console.log(`comparing ${lastWindowSum} to ${currentWindowSum} for window ending ${windowEnding}`)
                if (currentWindowSum > lastWindowSum) {
                    increases += 1;
                }
            }
            windows[windowEnding] = 0;
            lastWindowSum = currentWindowSum;
        }
        lineNumber += 1;
    });
    return increases;
}

day1Part2(testData).then(increases => console.log(`testing part 2 total increases ${increases}`));

readFileLines().then(lines => day1Part1(lines)).then(increases => console.log(`part 1 total increases observed ${increases}`));
readFileLines().then(lines => day1Part2(lines)).then(increases => console.log(`part 2 total increases observed ${increases}`));
