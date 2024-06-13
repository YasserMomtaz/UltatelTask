import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from 'src/app/Service/student.service';
import { Student } from 'src/app/dto/student.dto';
import Swal from 'sweetalert2'
import { EnumsService } from 'src/app/Service/enums.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent {
  studentForm: FormGroup;
  student:any;
  @Input() id:number=0;
  oldStudent:any;
  

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

  ngOnInit(): void {
    this.studentService.getStudentById(this.id).subscribe(student => {
      this.oldStudent=student;
      console.log(this.oldStudent);
      this.studentForm = this.fb.group({
        name: [this.oldStudent.name, Validators.required],
        dob: [this.oldStudent.dob, Validators.required],
        gender: [this.oldStudent.gender, Validators.required],
        country: [this.oldStudent.country, Validators.required],
        email: [this.oldStudent.email, [Validators.required, Validators.email]]
      });
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Saved!", "", "success");
          this.student=this.studentForm.value
          this.studentService.editStudent(this.oldStudent.id,this.student).subscribe(students => {
          this.activeModal.close(this.studentForm.value);
          })
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
          this.activeModal.close(this.studentForm.value);
        }
      });

      
    }
  }

  close() {
    this.activeModal.dismiss('Cross click');
  }
}
