// Project State Management and Rendering
class ProjectState {
  private listeners: any[] = [];              // 이벤트 리스너를 담을 배열
  private projects: any[] = [];
  private static instance: ProjectState;

  private constructor() {

  }

  // 싱글톤 패턴 사용하기 
  static getInstance() {
    if(this.instance) {         // 이미 인스턴스가 존재한다면
      return this.instance;   // 인스턴스를 반환한다.
    }
    this.instance = new ProjectState(); // 인스턴스가 존재하지 않는다면 새로 생성한다.
    return this.instance; // 인스턴스를 반환한다.
  }

  // 이벤트 리스너 추가하기
  addListener(listenerFn: Function) {
    this.listeners.push(listenerFn);   // 이벤트 리스너를 추가한다.
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = {
      id: Math.random().toString(),
      title: title,
      description: description,
      people: numOfPeople,
    };
    this.projects.push(newProject);             // 새로운 프로젝트를 추가한다.
    for(const listenerFn of this.listeners) {   // 이벤트 리스너를 순회하면서
      listenerFn(this.projects.slice());        // 이벤트 리스너를 실행한다.
    }
  }
}

const projectState = ProjectState.getInstance();    // 싱글톤 패턴으로 인스턴스 생성하기


// Validation
// 선택적인 프로퍼티를 사용하려면, 인터페이스에 ?를 붙여주면 된다.
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

// 입력값 유효성 검사 함수
function validate(validatableInput: Validatable){
  let isValid = true;
  if(validatableInput.required) {    
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  if(validatableInput.minLength != null && 
    typeof validatableInput.value === 'string') {
    isValid = isValid && 
                validatableInput.value.length >= validatableInput.minLength;
  }
  if(validatableInput.maxLength != null &&
    typeof validatableInput.value === 'string') {
    isValid = isValid &&
                validatableInput.value.length <= validatableInput.maxLength;
  }
  if(validatableInput.min != null &&
    typeof validatableInput.value === 'number') {
    isValid = isValid &&
                validatableInput.value >= validatableInput.min;
  }
  if(validatableInput.max != null &&
    typeof validatableInput.value === 'number') {
    isValid = isValid &&
                validatableInput.value <= validatableInput.max;
  }
  return isValid;
}

// autobind 데코레이터
// (target: any, methodName: string, descriptor: PropertyDescriptor) => PropertyDescriptor
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };
  return adjDescriptor;
}

// ProjectList 클래스
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  assignedProjects: any[];

  // 생성자 함수
  constructor(private type: 'active' | 'finished') {
    this.templateElement = document.getElementById(
      'project-list'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;
    this.assignedProjects = [];

    const importedNode = document.importNode(
      this.templateElement.content, 
      true
    );
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;

    projectState.addListener((projects: any[]) => {
      this.assignedProjects = projects;             // 프로젝트를 할당한다.
      this.renderProjects();                        // 프로젝트를 렌더링한다.
    });
    this.attach();
    this.renderContent();
  }

  private renderProjects() {
    const listEl = document.getElementById(`${this.type}-projects-list`);
    for(const projItem of this.assignedProjects) {
      const listItem = document.createElement('li');
      listItem.textContent = projItem.title;
      listEl?.appendChild(listItem);
    }
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = 
      this.type.toUpperCase() + ' PROJECTS';
  }

  private attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }
}

// ProjectInput 클래스
class ProjectInput {

  // HTML 요소에 대한 선언 
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  // 생성자 함수
  constructor() {    
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';

    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
    this.configure();
    this.attach();
  }

  // 사용자 입력값 수집 - [제목, 내용, 인원] 반환
  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };

    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };

    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,   
      max: 5,   
    };
    // 입력값 유효성 검사
    if(
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)      
    ) {
      alert('잘못된 입력입니다. 다시 입력해주세요.');      
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople]; // +를 붙이면 number로 변환된다.
    }
  }
  
  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  // 이벤트 핸들러
  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();   // 기본적으로 submit 이벤트는 새로고침을 발생시키는데, 이를 막기 위해 preventDefault()를 사용한다.
    const userInput = this.gatherUserInput();
    if(Array.isArray(userInput)) {                    // 입력값이 배열이면
      const [title, desc, people] = userInput;        // 배열 비구조화 할당
      projectState.addProject(title, desc, people);   // 새로운 프로젝트 추가
      this.clearInputs();                             // 입력값 초기화
    }    
  }
  
  // 동작 설정 
  private configure() {
    // 기존에는 bind(this)를 사용했지만, 데코레이터를 사용하면 자동으로 바인딩이 된다.
    this.element.addEventListener('submit', this.submitHandler);
  }

  // HTML 요소에 추가
  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

// 인스턴스 생성 - app.ts 파일이 실행될 때, 자동으로 실행된다.
const prjInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished'); 