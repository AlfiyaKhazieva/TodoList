import './TodoList.css'
import { useState, useEffect } from 'react';
import { ReactComponent as Basket } from './basket.svg'
import { ReactComponent as Added } from './added.svg'





function TodoList () {

    const [value, setValue] = useState(localStorage.getItem('value') || '');

    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);

    const handleChange = (event) => {
        setValue(event.target.value)
        //localStorage.setItem('value', value)     
    }

    const handleClick = (event) => {
        setTodos([...todos, value]);
        setValue('');
        localStorage.setItem('todos', JSON.stringify([...todos, value]))
    }

    //useEffect(() => {
        //localStorage.setItem('todos', JSON.stringify([...todos, value]))

    //},[todos])

    //useEffect(() => {
        //setTodos(JSON.parse(localStorage.getItem('todos')) || [])

    //},[])

    useEffect(() => {
        localStorage.setItem('value', value)

    },[value])



    return (
        <>
        <div className='todoList'>
            <h1 className='todoList__name'>Todo List</h1>
            <div className='todoList__second'>
                <div className='todoList__input-conteiner'>
                    <input className='todoList__input' type="text" placeholder="Введите текст..." onChange={handleChange} value={value}/>
                    <button className='todoList__btn' onClick={handleClick} disabled={value === ''}><strong>+</strong></button>
                </div>
                <div className='todoList__conteiner'>
                    <select className='todoList__btn-select'>
                        <option value="">активные</option>
                        <option value="">завершенные</option>
                        <option value="">удаленные</option>
                    </select>
                </div>
            </div>
        </div>
        <div className='tooList__todo'>
            <ul className='todoList__list'>
                {todos.map(function(todo){
                    return (
                       <li className='todoList__map' key={todo}>
                        {todo} 
                        <div className='todoList__basket'><Basket /></div> 
                        <div className='todoList__added'><Added /></div> 
                        </li>
                    )
                })}
            </ul>
        </div>
        </>
    )
}

export default TodoList;