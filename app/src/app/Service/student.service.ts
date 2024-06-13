import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { StudentFilter } from '../dto/studentFilter.dto';
import { StudentPaginated } from '../dto/studentPaginated.dto';
import { Student } from '../dto/student.dto';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
   private APIurl:string = "http://localhost:3000/students/";
  constructor(private httpClient: HttpClient) { }

  getStudentById(id:number): Observable<Student> {
    return this.httpClient.get<Student>(this.APIurl+id);
  }

  filterStudent(currentPage:number , pageSize:number , searchParams:any):Observable<StudentPaginated>{
    return this.httpClient.post<StudentPaginated>(this.APIurl+"search?page="+currentPage+"&pageSize="+pageSize,searchParams)
  }

  addStudent(student: Student): Observable<Student> {
    return this.httpClient.post<Student>(this.APIurl,student)
  }

  deleteStudent(id: number): Observable<string> {
    return this.httpClient.delete<string>(this.APIurl+id);
  }

  editStudent(id:number,updatedStudent: Student): Observable<Student> {
    return this.httpClient.put<Student>(this.APIurl+id,updatedStudent)
  }
}