"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Student {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.grades = [];
        Student.studentCount++;
    }
    addGrade(grade) {
        this.grades.push(grade);
    }
    getAverageGrade() {
        if (this.grades.length === 0)
            return 0;
        const total = this.grades.reduce((acc, curr) => acc + curr, 0);
        return total / this.grades.length;
    }
    static getStudentCount() {
        return Student.studentCount;
    }
}
Student.studentCount = 0;
// Part 1 Output
const student0 = new Student("Palatip", 20);
student0.addGrade(85);
student0.addGrade(90);
console.log(`${student0.name} average grade is: ${student0.getAverageGrade()}`);
console.log(`Total students: ${Student.getStudentCount()}`);
class GraduateStudent extends Student {
    constructor(name, age, thesisTopic) {
        super(name, age);
        this.thesisTopic = thesisTopic;
    }
    getAverageGrade() {
        let average = super.getAverageGrade();
        if (this.thesisTopic.toLowerCase() === "artificial intelligence") {
            average += 5;
        }
        return average;
    }
}
// Part 2 Output
const gradStudent = new GraduateStudent("Fee", 22, "EduBangkok");
gradStudent.addGrade(85);
gradStudent.addGrade(90);
console.log(`${gradStudent.name} average grade is: ${gradStudent.getAverageGrade()}`);
function getTeacherInfo(teacher) {
    const studentCount = teacher.students.length;
    console.log(`Professor: ${teacher.name}`);
    console.log(`Subject: ${teacher.subject}`);
    console.log(`Number of students: ${studentCount}`);
}
// Part 3 Output
const teacher = {
    name: "Mr. Sorapak",
    subject: "Cloud Computing",
    students: [student0, gradStudent],
};
getTeacherInfo(teacher);
class Database {
    constructor() {
        this.entries = [];
    }
    addEntry(entry) {
        this.entries.push(entry);
    }
    getEntries() {
        return this.entries;
    }
}
// Part 4 Output
const studentDatabase = new Database();
studentDatabase.addEntry(student0);
studentDatabase.addEntry(gradStudent);
console.log(studentDatabase.getEntries());
function createGradeMultiplier(multiplier) {
    return function (grade) {
        return grade * multiplier;
    };
}
// Part 5 Output
const doubleGrade = createGradeMultiplier(2);
const doubledGrades = student0.grades.map(doubleGrade);
console.log(`Doubled grades for ${student0.name}:`, doubledGrades);
function applyGradeMultiplier(students, multiplierFunction) {
    students.forEach(student => {
        student.grades = student.grades.map(multiplierFunction);
    });
}
function fetchStudentData(studentId) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const mockData = {
                    "1": { name: "Mix", grades: [85, 90, 78] },
                    "2": { name: "Fee", grades: [88, 92, 95] }
                };
                const id = studentId.toString();
                if (mockData[id]) {
                    resolve(mockData[id]);
                }
                else {
                    reject(new Error(`Student with ID ${studentId} not found.`));
                }
            }, 1000);
        });
    });
}
// Part 6 Output
function getStudentInfo(studentId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const studentData = yield fetchStudentData(studentId);
            console.log(`Successfully fetched data for ${studentData.name}. Grades: ${studentData.grades}`);
        }
        catch (error) {
            console.error(`Error fetching student data: ${error.message}`);
        }
    });
}
getStudentInfo(1);
const students = [student0, gradStudent];
// Part 7 Output
const studentsAbove70 = students.filter(student => student.getAverageGrade() > 70);
console.log("Students with an average grade > 70:");
studentsAbove70.forEach(student => console.log(student.name));
const studentNames = students.map(student => student.name);
console.log("Student names:", studentNames);
const totalGrades = students.reduce((total, student) => total + student.grades.length, 0);
console.log("Total number of grades (all students):", totalGrades);
function parseStudentData(jsonData) {
    try {
        const studentData = JSON.parse(jsonData);
        if (!studentData.name || !studentData.age || !Array.isArray(studentData.grades)) {
            throw new Error("Invalid student data format");
        }
        return studentData;
    }
    catch (error) {
        return `Error parsing student data: ${error.message}`;
    }
}
// Part 8 Output
const validJson = '{"name": "Charles", "age": 26, "grades": [85, 90, 78]}';
console.log(parseStudentData(validJson));
const invalidJson = '{"name": "Carlos", "age": 34, "grades": [75, 80]';
console.log(parseStudentData(invalidJson));
const incompleteJson = '{"name": "Fee", "age": 22}';
console.log(parseStudentData(incompleteJson));
