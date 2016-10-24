const API = (function(){
  
  const timeout = () => Math.random() * 100

  const wrapWithPromise = fn =>
    (...args) => {
      return new Promise((resolve, reject) =>
        setTimeout(() => resolve(fn(...args)), timeout())
      )
    }

  return {
    // getEmployee(id): thenable
    getEmployee: wrapWithPromise(db.getEmployeeById),
    // getEmployeesByNationality(nationality): thenable
    getEmployeesByNationality: wrapWithPromise(db.getEmployeesByNationality),
    // getNationalities(): thenable
    getNationalities: wrapWithPromise(db.getNationalities),
  }
}());
