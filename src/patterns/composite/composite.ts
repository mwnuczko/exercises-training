import API from '../../../data/data';
import { Employee, Project } from '../../../data/data';

export interface hasSalary { 
  getTotalSalary(employees?: Employee[]): number
}

export class CompositeSalary implements hasSalary {
  leaf: Employee[] = [];
  composite: CompositeSalary;

  add(node: Employee | CompositeSalary){
    if(node instanceof CompositeSalary) {
      this.composite = node;
    } else {
      this.leaf.push(node);
    }
  }
  getTotalSalary = (input?: Employee[] | CompositeSalary): number => {
    if(input instanceof CompositeSalary) {
      return input.getTotalSalary();
    }
    return employees.reduce((acc: number, employee: Employee) => acc + employee.salary, 0 );


    return 0;
  }
}
