import { Nationality, DateString, Money, Phone, Email } from './shared';

// type alias
// export type Skill = string;

export interface Skill extends String {}

export type ContractType = "contract" | "permanent";


// NOTES: declaration merging (interfaces+, types-)
// interface extends, type & (intersection)
// performance-wise: interfaces - faster, types - slower
// 
// eg. union below, can't be represented as interface
type Key = number | string;
// interface -> reflects OOP, type -> FP
// interface - all properties known upfront
// type Worker = PizzaMan | Gardener

export type Employee = {
  "id": number;
  "nationality": Nationality,
  "departmentId": number;
  "keycardId": string;
  "account": string;
  "salary": Money;
  "office": [string, string];
  "firstName": string;
  "lastName": string;
  "title": string;
  "contractType": ContractType;
  "email": Email;
  "hiredAt": DateString;
  "expiresAt": DateString;
  "personalInfo": {
    "age": number;
    "phone": Phone;
    "email": Email;
    "dateOfBirth": DateString;
    "address": {
      "street": string;
      "city": string;
      "country": string;
    };
  },
  "skills": Skill[];
  "bio": string;
  "imgURL": string;
};
