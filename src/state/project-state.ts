import { Project, ProjectStatus } from "../models/project.js";

// Project State Management and Rendering
type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

export class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  // 싱글톤 패턴 사용하기
  static getInstance() {
    if (this.instance) {
      // 이미 인스턴스가 존재한다면
      return this.instance; // 인스턴스를 반환한다.
    }
    this.instance = new ProjectState(); // 인스턴스가 존재하지 않는다면 새로 생성한다.
    return this.instance; // 인스턴스를 반환한다.
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active,
    );
    this.projects.push(newProject); // 새로운 프로젝트를 추가한다.
    for (const listenerFn of this.listeners) {
      // 이벤트 리스너를 순회하면서
      listenerFn(this.projects.slice()); // 이벤트 리스너를 실행한다.
    }
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((prj) => prj.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

export const projectState = ProjectState.getInstance(); // 싱글톤 패턴으로 인스턴스 생성하기
