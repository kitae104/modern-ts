// 추상 클래스 
abstract class Department {

    // 정적 필드
    static fiscalYear = 2023;      // 초기화
    
    // 필드
    // private readonly id: string;
    // private name: string;
    protected employees: string[] = [];

    // 생성자 (매개변수로 선언을 대체할 수 있음)
    // readonly를 사용하면 생성자에서만 값을 할당할 수 있음
    constructor(protected readonly id: string, public name: string) {
        //this.id = id;
        //this.name = n;
    }

    // 정적 메소드
    static createEmployee(name: string) {
        return { name: name };
    }

    // 추상 메소드(자식 클래스에서 구현해야 함)    
    abstract describe(this: Department) : void;

    addEmployee(employee: string) {
        //this.id = 'd2';     // readonly이기 때문에 접근 불가능
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

class ITDepartment extends Department {
    constructor(id: string, public admins: string[]) {
         super(id, 'IT');
    }

    // 메소드 오버라이딩
    describe(): void {
        console.log('IT Department - ID: ' + this.id);
    }    
}

class AccountingDepartment extends Department {

    private lastReport: string;
    private static instance: AccountingDepartment;

    get mostRecentReport() {                    // getter
        if(this.lastReport) {                   
            return this.lastReport;             // getter를 사용하여 필드에 접근
        }
        throw new Error('No report found.');    // 에러 발생
    }

    set mostRecentReport(value: string) {       // setter
        if(!value) {
            throw new Error('Please pass in a valid value!');
        }
        this.addReport(value);                  // setter를 사용하여 값 설정
    }

    // 싱글톤 패턴 - 생성자를 private으로 선언하여 클래스 외부에서 인스턴스를 생성할 수 없도록 함
    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }    

    static getInstance() {
        if(AccountingDepartment.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartment('D2', []);
        return this.instance;
    }

    // 메소드 오버라이딩
    describe(): void {
        console.log('Accounting Department - ID: ' + this.id);
    }

    addEmployee(employee: string): void {
        if(employee === 'Max') {
            return;
        }
        this.employees.push(employee);  // 부모 클래스의 필드를 사용할 수 있음
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
    }
}

const employee1 = Department.createEmployee('Max');   // 정적 메소드 사용
console.log(employee1, Department.fiscalYear);        // 정적 필드 사용

// 인스턴스 생성
const it = new ITDepartment('A1', ['Max']);

it.addEmployee('Max');
it.addEmployee('Manu');

//accounting.employees[2] = 'Anna';       // private이기 때문에 접근 불가능

it.describe();
it.name = 'NEW NAME';
it.printEmployeeInformation();

console.log(it);

// 싱클톤이라 new를 사용할 수 없음
const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();  // 같은 인스턴스를 사용함

accounting.addReport('Something went wrong...');
accounting.mostRecentReport = 'Year End Report';    // setter를 사용하여 값 설정
console.log(accounting.mostRecentReport);           // getter를 사용하여 필드에 접근

accounting.addEmployee('Max');
accounting.addEmployee('Manu');
// accounting.printReports();
// accounting.printEmployeeInformation();
accounting.describe();