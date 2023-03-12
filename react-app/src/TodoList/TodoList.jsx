import './TodoList.css'
import { useState, useEffect } from 'react';
import { ReactComponent as Basket } from './basket.svg'
import { ReactComponent as Added } from './added.svg'


const initialState = [
    { id: Math.random(), text: 'task1', status: 'active' },
    { id: Math.random(), text: 'task2', status: 'active' },
    { id: Math.random(), text: 'task3', status: 'active' },
]

function TodoList () {

    // наш текст
    const [value, setValue] = useState(localStorage.getItem('value') || '');
    
    // наш туду, то есть список на страинце
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
    console.log(todos)

    // функция, позволяющая писать текст в input
    const handleChange = (event) => {
        setValue(event.target.value)
    }

    // при клике на кнопку +, у нас отрисовывается список на странице
    const handleClick = () => {
        const valueTodo = {id: Math.random(), text: value, status: 'active'} 
        // console.log(valueTodo);
        setTodos([...todos, valueTodo]);
        setValue('');
        localStorage.setItem('todos', JSON.stringify([...todos, valueTodo]))
    }

    useEffect(() => {
        localStorage.setItem('value', value)
    },[value])


    // изменение статуса (баскета и галочки)
    const handleChangeStatus = (todo, status) => {
       todo.status = status;
       localStorage.setItem('todos', JSON.stringify(todos))
       setTodos([...todos]) 
    }

    // меняем валью у селекта
    const [status, setStatus] = useState(localStorage.getItem('status') || 'active');

    const changeStatus = (e) => {
        setStatus(e.target.value)
    }

    useEffect(() => {
        localStorage.setItem('status', status)
    },[status])

    const results = todos.filter(todo => todo.status === status)

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
                    <select defaultValue={status} className='todoList__btn-select' onChange={changeStatus}>
                        <option value="active">активные</option>
                        <option value="done">завершенные</option>
                        <option value="deleted">удаленные</option>
                    </select>
                </div>
            </div>
        </div>
        <div className='todoList__todo'>
            <ul className='todoList__list'> 
                {results.map(function(result){
                    return (
                       <li className='todoList__map' key={result.id}>
                        {result.text} 
                        <div className='todoList__basket' onClick={() => handleChangeStatus(result, 'deleted')}><Basket/></div> 
                        <div className='todoList__added' onClick={() => handleChangeStatus(result, 'done')}><Added /></div> 
                        </li>
                    )
                })}
            </ul>
        </div>
        </>
    )
}

export default TodoList;