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

  // タスクの状態を切り替えるメソッド
  toggleTodo(id: number) {
    const updatedTodos = this.todos.value.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    this.todos.next(updatedTodos)
  }

  // フィルターされたタスクの一覧を取得するメソッド
  getFilteredTodos(filter: 'all' | 'active' | 'completed'): Observable<Todo[]> {
    return this.todos.pipe(
      map(todos => {
        switch (filter) {
          // 未完了のタスクを取得
          case 'active':
            return todos.filter(todo => !todo.completed)
          // 完了したタスクを取得
          case 'completed':
            return todos.filter(todo => todo.completed)
          // 全てのタスクを取得
          default:
            return todos
        }
      })
    )
  }
  
}