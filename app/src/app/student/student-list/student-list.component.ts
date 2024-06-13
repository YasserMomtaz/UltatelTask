import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../Service/student.service';
import { StudentFilter } from 'src/app/dto/studentFilter.dto';
import { inject, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentAddComponent } from '../student-add/student-add.component';
import { Student } from 'src/app/dto/student.dto';
import { StudentEditComponent } from '../student-edit/student-edit.component';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: StudentFilter[] = [];
  filteredStudents: StudentFilter[] = [];
  searchName: string = '';
  searchAgeFrom: number | null = null;
  searchAgeTo: number | null = null;
  searchCountry: string = '';
  searchGender: string = '';
  loading:boolean = false;
  countries: string[] = ['USA', 'Canada', 'UK', 'Australia'];
  genders: string[] = ['Male', 'Female'];
  searchParams:any={}
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems:number = 0;
  private modalService = inject(NgbModal);
  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.filterStudent(1,this.itemsPerPage,this.searchParams).subscribe(students => {
      this.students = students.data.map(student => ({
        ...student,
        age: this.calculateAge(student.dob)
      }));
      this.totalItems=students.total
      this.filteredStudents = this.students;
    });
  }

  addStudent(student: Student): void {
    this.studentService.addStudent(student);
    this.updateFilteredStudents();
  }

  calculateAge(dob: Date): number {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  deleteStudent(id: number): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Student Record has been deleted.",
          icon: "success"
        });
        this.studentService.deleteStudent(id).subscribe(student => {
          this.updateFilteredStudents();
        });
      }
    });

  }

  editStudent(id:number): void {
    console.log(id);
    const modalRefEdit = this.modalService.open(StudentEditComponent)
      modalRefEdit.componentInstance.id = id;
      modalRefEdit.result.then(
        (result) => {
          this.updateFilteredStudents();
        },
        () => {
        }
      )
  }

  addNewStudent(): void {
    
      const modalRef = this.modalService.open(StudentAddComponent);
      modalRef.componentInstance.name = 'World';
    
  }

  updateFilteredStudents(): void {
    this.searchParams.name = this.searchName.trim();
    this.searchParams.age = this.searchAgeFrom;
    this.searchParams.ageto = this.searchAgeTo;
    this.searchParams.country = this.searchCountry.trim();
    this.searchParams.gender = this.searchGender.trim();
    this.studentService.filterStudent(this.currentPage,this.itemsPerPage,this.searchParams).subscribe(students => {
      this.students = students.data.map(student => ({
        ...student,
        age: this.calculateAge(student.dob)
      }));
      this.filteredStudents = this.students;
      this.totalItems=students.total;
    });
  }

  getPage(page:number){
    this.currentPage = page;
    this.updateFilteredStudents()
  }

  handleSearch(): void {
    this.currentPage = 1; // Reset to first page on new search
    this.updateFilteredStudents();
  }

  resetSearch(): void {
    this.searchName = '';
    this.searchAgeFrom = null;
    this.searchAgeTo = null;
    this.searchCountry = '';
    this.searchGender = '';
    this.updateFilteredStudents();
  }

  
}
