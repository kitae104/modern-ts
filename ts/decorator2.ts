// 데코레이터는 클래스, 프로퍼티, 메소드, 게터/세터, 파라미터에 사용할 수 있다.
function Logger(logString: string) {
  console.log('LOGGER FACTORY');
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  }
}

function WithTemplate(template: string, hookId: string){
  console.log('TEMPLATE FACTORY');
  return function(constructor: any){
    console.log('Rendering template');
    const hookIdEl = document.getElementById(hookId);
    const p = new constructor();
    if(hookIdEl){
      hookIdEl.innerHTML = template;
      hookIdEl.querySelector('h1')!.textContent = p.name;
    }
  }
}

// 데코레이터는 클래스가 정의되는 시점에 실행된다.
@Logger('LOGGING - PERSON')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
  name = 'Max';

  constructor() {
    console.log('Creating person object...');
  }
}

const person = new Person();
console.log(person);

// ---
function Log(target: any, propertyName: string | Symbol) {
  console.log('Property decorator!');
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator!');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('Method decorator!');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name:string | Symbol, position: number) {
  console.log('Parameter decorator!');
  console.log(target);
  console.log(name);
  console.log(position);
}


class Product {
  @Log
  title: string;
  private _price: number; 

  @Log2
  set price(val: number) {
    if(val > 0) {
      this._price = val;
    } else {
      throw new Error('Invalid price - should be positive!');
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this.price * (1 + tax);
  }
}

