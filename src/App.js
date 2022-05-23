import React from 'react'
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { addTask, deleteTask, deleteAllTasks } from './redux/reducers/tasks'
import './style.css'

function App() {

  const dispatch = useDispatch()
  const tasks = useSelector((store) => store.tasks.tasks);
  const tasksCount = useSelector(store => store.tasks.tasksCount)

  return (
    <div className="App">
      <header>Todo App</header>
      <form onSubmit={(event) => {
        event.preventDefault();
        dispatch(addTask(event.target[0].value))
        event.target[0].value = ''
        event.target[1].value = ''
      }} className="form">
        <input required placeholder="tasks" type='text' className='form__input' />
        <button type='submit' className='form__btn'>+</button>
      </form>

      <ul className='list'>
        {tasks.map(item => (
          <li key={item.id} className="list__item">
            <button type='button' className='list__btn'>copy</button>
            {item.title}
            <button className='list__btn' type="button" onClick={() => dispatch(deleteTask(item.id))}>Delete</button>
          </li>
        ))}
      </ul>
      <div className='footer'>
        <button className='footer__btn' onClick={() => dispatch(deleteAllTasks())}>Удалить все</button>
        <h3>Количество тасков - {tasksCount}</h3>
      </div>



    </div>
  );
}

export default App;
