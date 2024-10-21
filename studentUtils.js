"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateMedianGrade = calculateMedianGrade;
function calculateMedianGrade(grades) {
    if (grades.length === 0)
        return 0;
    grades.sort((a, b) => a - b);
    const mid = Math.floor(grades.length / 2);
    if (grades.length % 2 === 0) {
        return (grades[mid - 1] + grades[mid]) / 2;
    }
    else {
        return grades[mid];
    }
}
