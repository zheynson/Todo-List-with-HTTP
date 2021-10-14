import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {delay} from 'rxjs/operators';

export interface Todo {
    complete: boolean;
    title: string;
    id?: number;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    todos: Todo[] = [];
    title = '';
    loading = false;

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.fetchTodo();
    }

    addTodos() {
        if (!this.title) {
            return;
        }
        const newTodo: Todo = {
            complete: false,
            title: this.title,
        };

        this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', newTodo)
            .subscribe(todo => {
                console.log(todo);
                this.title = '';
                this.todos.unshift(newTodo);
            });
    }

    fetchTodo() {
        this.loading = true;
        this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=7')
            .pipe(delay(1350))
            .subscribe(reserve => {
                this.todos = reserve;
                this.loading = false;
            });
    }

    delete(id: any) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.http.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .subscribe(to => {
            });
    }
}

