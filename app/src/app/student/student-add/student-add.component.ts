
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from 'src/app/Service/student.service';
import { Student } from 'src/app/dto/student.dto';
import Swal from 'sweetalert2'
import { EnumsService } from 'src/app/Service/enums.service';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent {
  @Input() data: any;
  studentForm: FormGroup;
  student:any;
  

  genders:string[];
  countries:string[];

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private studentService: StudentService,private enumsService: EnumsService) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      dob: ['', Validators.required],
      gender: [null, Validators.required],
      country: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
    this.genders=enumsService.getGenders();
    this.countries=enumsService.getCountries();
  }

  onSubmit() {
    if (this.studentForm.valid) {
      this.student=this.studentForm.value
      this.studentService.addStudent(this.student).subscribe(students => {
        Swal.fire({
          title: "Good job!",
          text: "Student: "+students.name+", has been created successfully",
          icon: "success"
        });
        this.activeModal.close(this.studentForm.value);
      })
    }
  }

  close() {
    this.activeModal.dismiss('Cross click');
  }
}
