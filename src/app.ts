// 인스턴스 생성 - app.ts 파일이 실행될 때, 자동으로 실행된다.
import { ProjectInput } from './components/project-input';
import { ProjectList } from './components/project-list';

new ProjectInput();
new ProjectList('active');
new ProjectList('finished');

