import { Component } from '@angular/core';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { Observable } from 'rxjs';
import { TodoService } from '../../service/todo.service';
import { Todo } from '../../models/todo.interface';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoFormComponent, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  // フィルターされたタスクの一覧を管理するObservable
  filteredTodos$: Observable<Todo[]>
  // フィルターの選択肢
  filters: ('all' | 'active' | 'completed')[] = ['all', 'active', 'completed']
  // 現在のフィルター状態
  currentFilter: 'all' | 'active' | 'completed' = 'all'

  constructor(private todoService: TodoService) {
    this.filteredTodos$ = this.todoService.getFilteredTodos(this.currentFilter);
  }

  // フィルターを切り替えるメソッド
  setFilter(filter: 'all' | 'active' | 'completed') {
    this.currentFilter = filter;
    this.filteredTodos$ = this.todoService.getFilteredTodos(filter);
  }

  // タスクの状態を切り替えるメソッド
  toggleTodo(id: number) {
    this.todoService.toggleTodo(id);
  }
}
