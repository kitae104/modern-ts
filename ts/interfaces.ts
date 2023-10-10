// 인터페이스 - type으로 처리도 가능 하지만, 인터페이스를 사용하는 것이 좋다.
// 값을 담을 수 있는 껍데기
interface Named {
  readonly name?: string;          // 읽기 전용 - 한번만 값을 할당할 수 있다.
  outputName?: string;            // 선택적 프로퍼티 - 있어도 되고 없어도 된다.
}

interface Greetable extends Named{
  // 추상 메소드 - 구현부가 없는 메소드  
  greet(phrase: string): void;
}

// 여러 클래스에서 공유하기 위해 인터페이스를 사용한다.
// 인터페이스를 사용하면, 클래스에서 구현할 때, 인터페이스에 정의된 메소드를 구현해야 한다.
class Person implements Greetable{
  name?: string;
  age = 30;

  // ?를 붙이면 선택적 프로퍼티가 된다.
  constructor(n?: string){
    if(n){
      this.name = n;
    }
  }

  greet(phrase: string){
    if(this.name){
      console.log(phrase + ' ' + this.name);
    } else {
      console.log('생성자에 매개변수가 없는 경우 ');
    }
  }
}

let user1: Greetable;

user1 = new Person("홍길동");

user1.greet('인터페이스 연습 중 입니다. : ');
console.log(user1);

// 함수 타입 설정 
type AddFn = (a: number, b: number) => number;

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
}

// 함수 타입 대신 인터페이스를 사용할 수 있다.
interface AddFn2 {
  (a: number, b: number): number;
}

let add2: AddFn2;

add2 = (n1: number, n2: number) => {
  return n1 + n2;
}

