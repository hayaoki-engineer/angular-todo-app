import { Component } from '@angular/core';
import { TodoService } from '../../service/todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css'
})
export class TodoFormComponent {

  newTodoTitle = ''

  constructor(private todoService: TodoService) { }
  
  // タスクを追加するメソッド
  addTodo() {
    if (this.newTodoTitle) {
      console.log('タスクを追加します:', this.newTodoTitle)
      this.todoService.addTodo(this.newTodoTitle)
      this.newTodoTitle = ''
    }
  }

}
