"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
        console.log(Department.fiscalYear);
    }
    static createEmployee(name) {
        return { name: name };
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
Department.fiscalYear = 2020;
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, 'IT');
        this.admins = admins;
        this.admins = admins;
    }
    describe() {
        console.log(`IT Department - ID: ${this.id}`);
    }
}
class AccountingDepartment extends Department {
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found.');
    }
    set mostRecentReport(value) {
        if (!value) {
            throw new Error('Please pass in a valid value!');
        }
        this.addReport(value);
    }
    constructor(id, reports) {
        super(id, 'Accounting');
        this.reports = reports;
        this.lastReport = reports[0];
    }
    static getInstance() {
        if (AccountingDepartment.instance) {
            return AccountingDepartment.instance;
        }
        this.instance = new AccountingDepartment('d2', []);
        return this.instance;
    }
    ;
    describe() {
        console.log(`Accounting Department - ID: ${this.id}`);
    }
    addEmployee(name) {
        if (name === 'Christopher') {
            return;
        }
        this.employees.push(name);
    }
    addReport(text) {
        this.reports.push(text);
        this.lastReport = text;
    }
    printReport() {
        console.log(this.reports);
    }
}
const employee1 = Department.createEmployee('Yip');
console.log(employee1, Department.fiscalYear);
const it = new ITDepartment('d1', ['Christopher']);
it.addEmployee('Christopher');
it.addEmployee('Vani');
it.describe();
it.name = 'NEW NAME';
it.printEmployeeInformation();
console.log(it);
const accounting = AccountingDepartment.getInstance();
accounting.mostRecentReport = 'Year End Report';
accounting.addReport('Something went wrong...');
console.log(accounting.mostRecentReport);
accounting.addEmployee('Christopher');
accounting.addEmployee('Albert');
accounting.describe();
//# sourceMappingURL=classes.js.map