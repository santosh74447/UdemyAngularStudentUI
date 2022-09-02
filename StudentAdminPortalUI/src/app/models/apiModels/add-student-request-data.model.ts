import { Address } from "./address.model";
import { Gender } from "./gender.model";

export interface AddStudentRequestData{
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  email: string,
  mobile: number,
  genderId: string,
  physicalAddress: string,
  postalAddress: string
}