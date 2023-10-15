// App 네임스페이스 선언
// Drag & Drop 인터페이스
export interface Draggable {
  dragStartHandler(event: DragEvent): void; // 드래그 시작 이벤트 핸들러
  dragEndHandler(event: DragEvent): void; // 드래그 종료 이벤트 핸들러
}

export interface DragTarget {
  dragOverHandler(event: DragEvent): void; // 드래그 오버 이벤트 핸들러
  dropHandler(event: DragEvent): void; // 드랍 이벤트 핸들러
  dragLeaveHandler(event: DragEvent): void; // 드래그 리브 이벤트 핸들러
}
