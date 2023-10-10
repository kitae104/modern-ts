// 교차 타입 
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee; // 교차 타입

const e1: ElevatedEmployee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric; // 교차 타입

// 타입 가드 : 타입을 체크하는 함수(typeof)
function add(a: Combinable, b: Combinable){
  if(typeof a === 'string' || typeof b === 'string'){
    return a.toString() + b.toString();
  }
  return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee){
  console.log('Name: ' + emp.name);
  if('privileges' in emp){
    console.log('Privileges: ' + emp.privileges);
  }
  if('startDate' in emp){
    console.log('Start Date: ' + emp.startDate);
  }
}

printEmployeeInformation(e1);

class Car {
  drive(){
    console.log('Driving...');
  }
}

class Truck {
  drive(){
    console.log('Driving a truck...');
  }

  loadCargo(amount: number){
    console.log('Loading cargo ...' + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle){
  vehicle.drive();
  // instanceof : 클래스의 인스턴스인지 확인
  if(vehicle instanceof Truck){
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

interface Bird {
  type: 'bird';           // type 속성 사용 
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal : Animal){
  switch(animal.type){
    case 'bird':
      console.log('Moving with speed: ' + animal.flyingSpeed);
      break;
    case 'horse':
      console.log('Moving with speed: ' + animal.runningSpeed);
      break;
  }
}

moveAnimal({type: 'bird', flyingSpeed: 10});
moveAnimal({type: 'horse', runningSpeed: 10});

// 타입 캐스팅
const userInputElement = document.getElementById('message-output')! as HTMLInputElement;
userInputElement.value = "Hi there!";