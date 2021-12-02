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

const testData1 = [
    'forward 5',
    'down 5',
    'forward 8',
    'up 3',
    'down 8',
    'forward 2'
];

async function day2Part1(lines) {
    const regex = /([a-z]+) ([0-9]+)/
    let position = 0;
    let depth = 0;
    lines.forEach(line => {
        const match = line.match(regex);
        const move = match[1];
        const distance = parseInt(match[2], 10);
        switch(move) {
            case 'forward':
                position += distance;
                break;
            case 'down':
                depth += distance;
                break;
            case 'up':
                depth -= distance;
                break;
        }
        console.log(`new position: ${position} depth: ${depth}`);
    });
    return position * depth;
}

day2Part1(testData1).then(result => console.log(`test case final result: ${result}`));
// readFileLines().then(lines => day2Part1(lines)).then(result => console.log(`result output from file: ${result}`));

async function day2Part2(lines) {
    const regex = /([a-z]+) ([0-9]+)/
    let position = 0;
    let depth = 0;
    let aim = 0;
    lines.forEach(line => {
        const match = line.match(regex);
        const move = match[1];
        const distance = parseInt(match[2], 10);
        switch(move) {
            case 'forward':
                position += distance;
                depth += (aim * distance);
                break;
            case 'down':
                aim += distance;
                break;
            case 'up':
                aim -= distance;
                break;
        }
        console.log(`new position: ${position} depth: ${depth}`);
    });
    return position * depth;
}

day2Part2(testData1).then(result => console.log(`test case 2 final result: ${result}`));
readFileLines().then(lines => day2Part2(lines)).then(result => console.log(`result output 2 from file: ${result}`));
