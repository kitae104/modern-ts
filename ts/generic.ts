function merge<T extends object, U extends object>(objA: T, objB: U){
  return Object.assign(objA, objB);
}

const mergeObj = merge({name: 'Max'}, {age: 30});
console.log(mergeObj);

const mergeObj2 = merge({name: 'Max', hobbies: ['Sports']}, {age: 30});
console.log(mergeObj2);

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string]{
  let descriptionText = 'Got no value.';
  if(element.length === 0){
    descriptionText = 'Got 1 elements.';
  } else if(element.length > 0){
    descriptionText = 'Got ' + element.length + ' elements.';
  }
  return [element, descriptionText];
}

console.log(countAndDescribe('Hi there!'));
console.log(countAndDescribe(['Sports', 'Cooking']));

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U){
  return 'Value: ' + obj[key];
}

console.log(extractAndConvert({name: 'kitae'}, 'name'));
console.log(extractAndConvert({name: 'Max'}, 'name'));

// 제네릭 클래스는 클래스 내부에서 사용되는 데이터 타입을 클래스를 사용할 때 결정하는 것이 가능하도록 하는 기능입니다. 제네릭 클래스를 사용하면 클래스를 정의할 때 데이터 타입을 미리 지정하지 않고, 클래스를 사용할 때 데이터 타입을 동적으로 결정할 수 있습니다. 이를 통해 코드의 재사용성과 유연성을 높일 수 있습니다. 제네릭 클래스는 클래스 이름 뒤에 <T>와 같이 꺾쇠 괄호 안에 타입 매개변수를 지정하여 사용합니다. 예를 들어, class DataStorage<T>와 같이 사용할 수 있습니다.
class DataStorage<T extends string | number | boolean | object> {
  private data:T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if(this.data.indexOf(item) === -1){
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Max');
textStorage.addItem('Manu');
textStorage.removeItem('Max');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);
numberStorage.addItem(2);
console.log(numberStorage.getItems());

const objStorage = new DataStorage<object>();
objStorage.addItem({name: 'Max'});
objStorage.addItem({name: 'Manu'});
objStorage.removeItem({name: 'Max'});
console.log(objStorage.getItems());

// Partial 
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

interface Person {
  name: string;
  age: number;
  address: string;
}
function createCourseGoal(title: string, description: string, date: Date): CourseGoal{
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

// Readonly
const names: Readonly<string[]> = ['Max', 'Anna'];
//names.push('Manu');     // 오류 발생 

console.log(names);


function extractData1(key: string){
  return 'a';
}
const data = extractData1<string>(user, 'userId');
