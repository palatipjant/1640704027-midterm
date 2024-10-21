class Student {
    private static studentCount: number = 0;
    name: string;
    age: number;
    grades: number[];

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
        this.grades = [];
        Student.studentCount++;
    }

    addGrade(grade: number): void {
        this.grades.push(grade);
    }

    getAverageGrade(): number {
        if (this.grades.length === 0) return 0;
        const total = this.grades.reduce((acc, curr) => acc + curr, 0);
        return total / this.grades.length;
    }

    static getStudentCount(): number {
        return Student.studentCount;
    }
}

// Part 1 Output
const student0 = new Student("Palatip", 20);
student0.addGrade(85);
student0.addGrade(90);
console.log(`${student0.name} average grade is: ${student0.getAverageGrade()}`);
console.log(`Total students: ${Student.getStudentCount()}`);

class GraduateStudent extends Student {
    thesisTopic: string;

    constructor(name: string, age: number, thesisTopic: string) {
        super(name, age);
        this.thesisTopic = thesisTopic;
    }

    getAverageGrade(): number {
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

interface Teacher {
    name: string;
    subject: string;
    students: Student[];
}

function getTeacherInfo(teacher: Teacher): void {
    const studentCount = teacher.students.length;
    console.log(`Professor: ${teacher.name}`);
    console.log(`Subject: ${teacher.subject}`);
    console.log(`Number of students: ${studentCount}`);
}

// Part 3 Output
const teacher: Teacher = {
    name: "Mr. Sorapak",
    subject: "Cloud Computing",
    students: [student0, gradStudent],
};
getTeacherInfo(teacher);

class Database<T> {
    private entries: T[] = [];

    addEntry(entry: T): void {
        this.entries.push(entry);
    }

    getEntries(): T[] {
        return this.entries;
    }
}

// Part 4 Output
const studentDatabase = new Database<Student>();
studentDatabase.addEntry(student0);
studentDatabase.addEntry(gradStudent);
console.log(studentDatabase.getEntries());

function createGradeMultiplier(multiplier: number) {
    return function(grade: number): number {
        return grade * multiplier;
    };
}

// Part 5 Output
const doubleGrade = createGradeMultiplier(2);
const doubledGrades = student0.grades.map(doubleGrade);
console.log(`Doubled grades for ${student0.name}:`, doubledGrades);

function applyGradeMultiplier(students: Student[], multiplierFunction: (grade: number) => number): void {
    students.forEach(student => {
        student.grades = student.grades.map(multiplierFunction);
    });
}

async function fetchStudentData(studentId: number): Promise<{ name: string; grades: number[] }> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const mockData: { [key: string]: { name: string; grades: number[] } } = {
                "1": { name: "Mix", grades: [85, 90, 78] },
                "2": { name: "Fee", grades: [88, 92, 95] }
            };

            const id = studentId.toString();

            if (mockData[id]) {
                resolve(mockData[id]);
            } else {
                reject(new Error(`Student with ID ${studentId} not found.`));
            }
        }, 1000);
    });
}

// Part 6 Output
async function getStudentInfo(studentId: number) {
    try {
        const studentData = await fetchStudentData(studentId);
        console.log(`Successfully fetched data for ${studentData.name}. Grades: ${studentData.grades}`);
    } catch (error) {
        console.error(`Error fetching student data: ${(error as Error).message}`); 
    }
}
getStudentInfo(1);

const students: Student[] = [student0, gradStudent];

// Part 7 Output
const studentsAbove70 = students.filter(student => student.getAverageGrade() > 70);
console.log("Students with an average grade > 70:");
studentsAbove70.forEach(student => console.log(student.name));
const studentNames = students.map(student => student.name);
console.log("Student names:", studentNames);
const totalGrades = students.reduce((total, student) => total + student.grades.length, 0);
console.log("Total number of grades (all students):", totalGrades);

function parseStudentData(jsonData: string): { name: string; age: number; grades: number[] } | string {
    try {
        const studentData = JSON.parse(jsonData);

        if (!studentData.name || !studentData.age || !Array.isArray(studentData.grades)) {
            throw new Error("Invalid student data format");
        }

        return studentData;
    } catch (error) {
        return `Error parsing student data: ${(error as Error).message}`;
    }
}

// Part 8 Output
const validJson = '{"name": "Charles", "age": 26, "grades": [85, 90, 78]}';
console.log(parseStudentData(validJson));

const invalidJson = '{"name": "Carlos", "age": 34, "grades": [75, 80]';
console.log(parseStudentData(invalidJson));

const incompleteJson = '{"name": "Fee", "age": 22}';
console.log(parseStudentData(incompleteJson));