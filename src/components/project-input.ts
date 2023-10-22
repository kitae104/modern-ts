import { Component } from "./base-components";
import * as Validation from './../util/validation';
import { autobind } from "../decorators/autobind";
import { projectState } from "../state/project-state";


// ProjectInput 클래스
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  // HTML 요소에 대한 선언
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  // 생성자 함수
  constructor() {
    super('project-input', 'app', true, 'user-input');
    this.titleInputElement = this.element.querySelector(
      '#title',
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      '#description',
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      '#people',
    ) as HTMLInputElement;
    this.configure();
  }

  // 동작 설정
  configure() {
    // 기존에는 bind(this)를 사용했지만, 데코레이터를 사용하면 자동으로 바인딩이 된다.
    this.element.addEventListener('submit', this.submitHandler);
  }

  renderContent() {}

  // 사용자 입력값 수집 - [제목, 내용, 인원] 반환
  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validation.Validatable = {
      value: enteredTitle,
      required: true,
    };

    const descriptionValidatable: Validation.Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };

    const peopleValidatable: Validation.Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };
    // 입력값 유효성 검사
    if (
      !Validation.validate(titleValidatable) ||
      !Validation.validate(descriptionValidatable) ||
      !Validation.validate(peopleValidatable)
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
    event.preventDefault(); // 기본적으로 submit 이벤트는 새로고침을 발생시키는데, 이를 막기 위해 preventDefault()를 사용한다.
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      // 입력값이 배열이면
      const [title, desc, people] = userInput; // 배열 비구조화 할당
      projectState.addProject(title, desc, people); // 새로운 프로젝트 추가
      this.clearInputs(); // 입력값 초기화
    }
  }
}
