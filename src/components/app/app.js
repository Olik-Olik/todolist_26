import React, {Component, useState} from "react";
import './app.css';
import AppHeader from "../app-header";

export default class App extends Component {
    maxId = 10;
    state = {
        //дефолтные
        todoDate: [
            this.createToDoItem('Ваня переустаавливает систему'),
            this.createToDoItem('Саша ищет баги'),
            this.createToDoItem('Федя пишет план '),
    ],
            /*    this.createToDoItem(
                {
                    id: this.maxId++,
                    status: 'user',
                    name: 'Глеб Фильтеровский',
                    email: 'gleb@mail.ru',
                    text: 'Сложная задача от Глеба!'
                }),
                this.createToDoItem(
                {
                    id: this.maxId++,
                    status: 'user',
                    name: 'Иван Редьюсов',
                    email: 'ivan@mail.ru',
                    text: 'Сложная задача от Иван!'
                }),
                this.createToDoItem(
                {
                    id: this.maxId++,
                    status: 'user',
                    name: 'Анна Мэп',
                    email: 'anna@mail.ru',
                    text: 'Сложная задача от Анны!'
                }),
                this.createToDoItem(
                {
                    id: this.maxId++,
                    status: 'user',
                    name: 'Оксаны Моши',
                    email: 'oksana@mail.ru',
                    text: 'Сложная задача от Оксаны!'
                }),
                this.createToDoItem(
                {
                    id: this.maxId++,
                    status: 'admin',
                    name: 'Коля  Сасс',
                    email: 'koly@mail.ru',
                    text: 'Сложная задача от Коли!'
                }),*/
      /*  ],*/
        term: '',
        filter: 'all'
        /*  filter: ((state_rol) => state_rol.status.match(/admin/)),*/
    }

    createToDoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++,
        }
    }

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.filter((e) => e.id === id);
            this.state.todoDate.splice(id, 1);
            const array = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)];
            return {
                todoData: array
            }
        });
    };

    addItem = (task) => {
        const newItem = this.createToDoItem(task);
        this.setState(({todoData}) => {
            const array = [
                ...todoData,
                newItem]
            return {
                todoData: array
            };
        });
    };
// выделение важного задания
    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
                return {
                    todoData: this.toggleProperty(
                        todoData,
                        id,
                        'important')
                };
            }
        )
    }

    toggleProperty(arr, id, propName)
    {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = {
            ...oldItem,
            [propName]: !oldItem[propName]};
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ]
    }
    onSearchChange = (item) => {
        this.setState({item});
    }

    onFilterChanche = (filter) => {
        this.setState({filter});
    }
    filter(items, filter){
        switch (filter){
            case 'all': return items;
            case 'active': return items.filter((item)=> !item.done);
            case 'done': return items.filter((item)=> !item.done);
            default: return items;
        }
    }
// логика поиска в тодолисте
    search(items, term){
        if(term.length ===0){
            return items;
        }
        return items.filter((items)=> {
            return items.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    }

//добавление к выполненным заданиям принимать будет id . Обратимся к нашему setState
    onToggleDone =(id) =>{
        this.setState((todoData)=> {
            return{
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        })
    }
    render()
    {
        const {todoData, term, filter} =this.state;
        const visibleItems = this.filter(this.search(todoData, term), filter);
        const doneCount = todoData.filter((el)=> el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className='todo-app'>
        {/*    <AppHeader
                toDo={doneCount}
                done={todoCount}/>*/}
            </div>
        )
    }
}