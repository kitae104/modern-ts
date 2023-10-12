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