abstract class Department {
    static fiscalYear = 2020;
    // private id: string;
    // private name: string;
    protected employees: string[] = [];

    constructor(protected readonly id: string, public name: string) {
        // this.id = id;
        // this.name = n;
        console.log(Department.fiscalYear)
    }

    abstract describe(this: Department): void;

    static createEmployee(name: string) {
        return{name: name}
    }

    addEmployee(employee: string) {

        this.employees.push(employee)
    }

    printEmployeeInformation() {
        console.log(this.employees.length)
        console.log(this.employees)
    }
}

class ITDepartment extends Department {
    constructor(id: string, public admins: string[]) {
        super(id, 'IT');
        this.admins = admins;
    }

    describe() {
        console.log(`IT Department - ID: ${this.id}`)
    }
}

class AccountingDepartment extends Department{
    private lastReport: string;
    private static instance: AccountingDepartment;

    get mostRecentReport() {
        if(this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found.')
    }

    set mostRecentReport(value: string) {
        if(!value) {
            throw new Error('Please pass in a valid value!')
        }
        this.addReport(value);
    }

    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }

    static getInstance() {
        if(AccountingDepartment.instance) {
            return AccountingDepartment.instance
        }
        this.instance = new AccountingDepartment('d2', []);
        return this.instance;
    };

    describe() {
        console.log(`Accounting Department - ID: ${this.id}`)
    }

    addEmployee(name:string) {
        if (name === 'Christopher') {
            return;
        }
        this.employees.push(name)
    }

    addReport(text: string) {
        this.reports.push(text)
        this.lastReport = text;
    }

    printReport() {
        console.log(this.reports)
    }
}

const employee1 = Department.createEmployee('Yip');
console.log(employee1, Department.fiscalYear);

const it = new ITDepartment('d1', ['Christopher']);

it.addEmployee('Christopher');
it.addEmployee('Vani');

// accounting.employees[2] = 'Albert';

it.describe()
it.name = 'NEW NAME'
it.printEmployeeInformation();

console.log(it);

// const accounting = new AccountingDepartment('d2', []);
const accounting = AccountingDepartment.getInstance();

accounting.mostRecentReport = 'Year End Report';
accounting.addReport('Something went wrong...');
console.log(accounting.mostRecentReport);

accounting.addEmployee('Christopher');
accounting.addEmployee('Albert');

// accounting.printReport();
// accounting.printEmployeeInformation();
accounting.describe();


// const accountingCopy = {name: 'DUMMY', describe: accounting.describe};

// accountingCopy.describe()

