import { BehaviorSubject, map, Observable } from "rxjs";
import { Todo } from "../models/todo.interface";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // タスクの一覧を管理するBehaviorSubject
  private todos = new BehaviorSubject<Todo[]>([])

  constructor() {}

  // タスクを追加するメソッド
  addTodo(title: string) {
    
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false
    };
    console.log('新しいタスク:', newTodo)

    // 新しいタスクを追加して、タスクの一覧を更新
    this.todos.next([...this.todos.value, newTodo])
    console.log('タスクの一覧:', this.todos.value)
  }

  getFilteredTodos(filter: 'all' | 'active' | 'completed'): Observable<Todo[]> {
    return this.todos.pipe(
      map(todos => {
        switch (filter) {
          case 'active':
            return todos.filter(todo => !todo.completed)
          case 'completed':
            return todos.filter(todo => todo.completed)
          default:
            return todos
        }
      })
    )
  }
  
}