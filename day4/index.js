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

const testDraws = [
    7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1
    ];

const testBoards = [
    [
        [22, 13, 17, 11,  0],
        [8,  2, 23,  4, 24],
        [21,  9, 14, 16,  7],
        [6, 10,  3, 18,  5],
        [1, 12, 20, 15, 19]
    ],
    [
        [3, 15,  0,  2, 22],
        [9, 18, 13, 17,  5],
        [19,  8,  7, 25, 23],
        [20, 11, 10, 24,  4],
        [14, 21, 16, 12,  6]
    ],
    [
        [14, 21, 17, 24,  4],
        [10, 16, 15,  9, 19],
        [18,  8, 23, 26, 20],
        [22, 11, 13,  6,  5],
        [2,  0, 12,  3,  7]
    ]
];

// The score of the winning board can now be calculated. Start by finding the sum of all unmarked numbers on that board;
// in this case, the sum is 188. Then, multiply that sum by the number that was just called when the board won, 24, to
// get the final score, 188 * 24 = 4512.
async function day4Part1(lines) {
    lines.forEach(line => {
    });
}

day4Part1(testData).then(result => console.log(`test case final result: ${result}`));
// readFileLines().then(lines => day2Part1(lines)).then(result => console.log(`result output from file: ${result}`));

async function day4Part2(lines) {
}

day4Part2(testData).then(result => console.log(`test case 2 final result: ${result}`));
// readFileLines().then(lines => day2Part2(lines)).then(result => console.log(`result output 2 from file: ${result}`));
