import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Student } from './student.model';
import { StudentService } from './student.service';

@Component({
    selector: 'app-student',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './student.component.html',
    styleUrls: ['./student.component.css']
})

export class StudentComponent implements OnInit {
    students: Student[] = [];

    newStudent: Student = {
        name: '',
        age: 0,
        present: false
    };

    editingStudentId: number | null = null; //It stores which student is being editing if null
    // we are in Add mode if it's a number we are in edit mode    

    constructor(private studentService: StudentService) { }

    ngOnInit() {
        this.loadStudents();
    }

    loadStudents() {
        this.studentService.getStudents().subscribe(data => {
            this.students = data;
        });
    }

    addStudent() {

        if (this.editingStudentId != null) {
            this.studentService.updateStudent(
                this.editingStudentId,
                this.newStudent).subscribe(() => {
                    this.loadStudents();
                    this.editingStudentId = null;
                    this.newStudent = { name: '', age: 0, present: false };
                });
        }
        else {
            if (!this.newStudent.name.trim() || this.newStudent.age <= 0) {
                return ;
            }
                this.studentService.addStudent(this.newStudent)
                    .subscribe(() => {
                        this.loadStudents();
                        this.newStudent = { name: '', age: 0, present: false };
                    });
        }



        //Update Mode
        /*if(this.editingStudentId !== null){
            this.students = this.students.map(student =>
                student.id === this.editingStudentId ? { ...this.newStudent, id: this.editingStudentId }
                :student
            );

            this.editingStudentId = null;
        }
        else{
        //Add mode
        this.students.push({
            ...this.newStudent,
            id: this.students.length + 1
        });
    }
        //Reset Form
        this.newStudent = { name: '', age: 0, present: false};
        }*/
    }

    deleteStudent(id: number) {
        this.studentService.deleteStudent(id).subscribe(() => {
            this.loadStudents();
        });
        //this.students = this.students.filter(student=>student.id !=id );
    }

    //When clicking the edit selected student in the form, stores it's ID in editingStudentId
    editStudent(student: Student) {
        this.newStudent = { ...student }; //Create a copy not a reference
        this.editingStudentId = student.id!;
    }
}