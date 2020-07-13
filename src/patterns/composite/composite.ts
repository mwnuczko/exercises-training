import API from '../../../data/data';
import { Employee, Project } from '../../../data/data';

export interface hasSalary { 
  getTotalSalary(): number
}

export class CompositeSalary implements hasSalary { 
}
