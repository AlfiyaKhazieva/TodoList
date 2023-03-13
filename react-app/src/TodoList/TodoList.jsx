import './TodoList.css'
import { useState, useEffect } from 'react';
import { ReactComponent as Basket } from './basket.svg'
import { ReactComponent as Added } from './added.svg'


function TodoList () {

    const [value, setValue] = useState(localStorage.getItem('value') || '');
    
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);


    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const handleClick = () => {
        const valueTodo = {id: Math.random(), text: value, status: 'active'} 
        setTodos([...todos, valueTodo]);
        setValue('');
        localStorage.setItem('todos', JSON.stringify([...todos, valueTodo]))
    }

    useEffect(() => {
        localStorage.setItem('value', value)
    },[value])


    // изменение статуса 
    const handleChangeStatus = (todo, status) => {
       todo.status = status;
       localStorage.setItem('todos', JSON.stringify(todos))
       setTodos([...todos]) 
    }

    // меняем статус у селекта
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
            <h1 className='todoList__name'>ToDo List</h1>
            <div className='todoList__second'>
                <div className='todoList__input-conteiner'>
                    <input className='todoList__input' type="text" maxLength={45} placeholder="Введите текст..." onChange={handleChange} value={value}/>
                    <button className='todoList__btn' onClick={handleClick} disabled={value === ''}><strong className='send'>+</strong></button>
                </div>
                <div className='todoList__conteiner'>
                    <select defaultValue={status} className='todoList__btn-select' onChange={changeStatus}>
                        <option className='option' value="active">активные</option>
                        <option className='option' value="done">завершенные</option>
                        <option className='option' value="deleted">удаленные</option>
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
                        <div className='todoList__basket' onClick={() => handleChangeStatus(result, 'deleted')}><Basket className='basket'/></div> 
                        <div className='todoList__added' onClick={() => handleChangeStatus(result, 'done')}><Added className='added' /></div> 
                        </li>
                    )
                })}
            </ul>
        </div>
        </>
    )
}

export default TodoList;