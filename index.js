"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const studentUtils_1 = require("./studentUtils");
const grades = [85, 90, 78, 92, 88];
const medianGrade = (0, studentUtils_1.calculateMedianGrade)(grades);
console.log(`The median grade is: ${medianGrade}`);
