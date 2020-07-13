import API from '../../../data/data';
import { CompositeSalary } from './composite';

describe('Composite', () => {
  it('should calculate salary = 0 for empty data set', () => {
    const composite = new CompositeSalary()
    expect(composite.getTotalSalary()).toEqual(0)
  })

  it('should calculate salaries of distinct employees', () => {
    const composite = new CompositeSalary()

    const e447819 = API.getEmployeeById(447819)
    // ...
    expect(composite.getTotalSalary()).toEqual(5064)

    const e46767 = API.getEmployeeById(46767)
    // ...
    const e219895 = API.getEmployeeById(219895)
    // ...
    expect(composite.getTotalSalary()).toEqual(14769)
  });

  it('should calculate salaries of whole departments', () => {
    const composite = new CompositeSalary()

    const managementEmployees = API.getEmployeesByDepartment(1)
    // ...
    expect(composite.getTotalSalary()).toEqual(1011413)
    
    const marketingEmployees = API.getEmployeesByDepartment(5)
    // ...
    expect(composite.getTotalSalary()).toEqual(2086129)
  })

  it('should calculate salaries of project teams', () => {
    // a team is all `team` members + the manager (n+1)
    // basing on their IDs, appropriate objects from API should be fetched using API.getEmployeeById
    const composite = new CompositeSalary()

    const project = API.getProjectById("6ff48068-a749-42bd-8df2-5176a57be4bc")
    // ...
    expect(composite.getTotalSalary()).toEqual(86366)
  })

  it('should calculate salaries of nested composites', () => {
    const composite = new CompositeSalary()

    const composite1 = new CompositeSalary()
    const e46767 = API.getEmployeeById(46767)
    // ...
    
    const composite2 = new CompositeSalary()
    const e219895 = API.getEmployeeById(219895)
    // ...

    // ... include composite1
    // ... include composite2
    expect(composite.getTotalSalary()).toEqual(9705)
  })

  it('should calculate salaries of various composite elements', () => {
    const composite = new CompositeSalary()

    const e447819 = API.getEmployeeById(447819)
    // ...

    const managementEmployees = API.getEmployeesByDepartment(1)
    // ...

    const project = API.getProjectById("6ff48068-a749-42bd-8df2-5176a57be4bc")
    // ...

    expect(composite.getTotalSalary()).toEqual(1102843)
  })
});
