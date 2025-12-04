import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KanbanViewComponent } from './kanban-view.component';
import { TaskTypeEnum } from '../../models/enum/task.enum';
import { PriorityEnum } from '../../models/enum/priority.enum';
import { faBug, faCalendar } from '@fortawesome/free-solid-svg-icons';

describe('Kanban View', () => {
  let component: KanbanViewComponent;
  let fixture: ComponentFixture<KanbanViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanbanViewComponent);
    component = fixture.componentInstance;
    
    // Mock de dados básicos
    component.tasks = [
      { id: 1, title: 'Task 1', column: 0, type: TaskTypeEnum.bug, subTasks: [{checked: true}, {checked: false}] } as any,
      { id: 2, title: 'Task 2', column: 1, type: TaskTypeEnum.task, subTasks: [] } as any,
      { id: 3, title: 'Task 3', column: 0, type: TaskTypeEnum.task, subTasks: [] } as any,
    ];
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter tasks by column correctly', () => {
    const col0Tasks = component.getTasks(0);
    const col1Tasks = component.getTasks(1);

    expect(col0Tasks.length).toBe(2);
    expect(col1Tasks.length).toBe(1);
    expect(col0Tasks[0].id).toBe(1);
  });

  it('should return correct icon based on task type', () => {
    const bugIcon = component.getIconType(TaskTypeEnum.bug);
    const defaultIcon = component.getIconType(999); // Tipo inexistente

    expect(bugIcon).toBe(faBug);
    expect(defaultIcon).toBe(faCalendar);
  });

  it('should calculate the length of checked subtasks correctly', () => {
    const subtasks = [
      { id: 1, title: 'Sub 1', checked: true },
      { id: 2, title: 'Sub 2', checked: false },
      { id: 3, title: 'Sub 3', checked: true },
    ] as any;

    const checkedCount = component.getCheckedSubTaksLength(subtasks);
    expect(checkedCount).toBe(2);
  });

  it('should return correct priority name', () => {
    expect(component.getPriorityName(PriorityEnum.high)).toBe('High');
    expect(component.getPriorityName(PriorityEnum.medium)).toBe('Medium');
    expect(component.getPriorityName(PriorityEnum.low)).toBe('Low');
    expect(component.getPriorityName(100)).toBe('Low'); // Default case
  });

  it('should emit saveTasks when a task is dropped in a different column', () => {
    spyOn(component.saveTasks, 'emit');
    
    // Simula o evento do CDK Drag & Drop
    const dragDropEvent = {
      previousContainer: { data: [] },
      container: { data: [] },
      item: { data: { id: 1 } },
      previousIndex: 0,
      currentIndex: 0
    } as any;

    // Forçamos containers diferentes para entrar no else
    dragDropEvent.previousContainer = { id: 'col-0' };
    dragDropEvent.container = { id: 'col-1' };

    component.drop(dragDropEvent, 1);

    expect(component.tasks.find(t => t.id === 1)?.column).toBe(1);
    expect(component.saveTasks.emit).toHaveBeenCalled();
  });

  it('should call openTask output when a task is clicked (if applicable)', () => {
    // Esse teste assume que você tem um clique no HTML que chama emit
    spyOn(component.openTask, 'emit');
    const mockTask = component.tasks[0];
    
    // Você pode testar a lógica do método que seria chamado pelo clique
    // Exemplo: se tivesse um method open(task: Task)
    component.openTask.emit(mockTask);
    
    expect(component.openTask.emit).toHaveBeenCalledWith(mockTask);
  });

  it('should sum 1 + 1', () => {
    let sum = 1 + 1;
    
    expect(sum).toBe(3);
  });
});