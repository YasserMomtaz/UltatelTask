import { Student } from "./student.dto";

export interface StudentPaginated {
    total : number,
    data:Student[]
  }