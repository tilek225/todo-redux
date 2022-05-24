import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { addTask, deleteTask, deleteAllTasks, editTask, doneTask, importantTask } from './redux/reducers/tasks'
import './style.css'

function App() {

  const dispatch = useDispatch()
  const tasks = useSelector((store) => store.tasks.tasks);
  const tasksCount = useSelector(store => store.tasks.tasksCount)
  const [search, setSearch] = useState('')
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('all')

  return (
    <div className="App">
      <header>Todo App</header>
      <form onSubmit={(event) => {
        event.preventDefault();
        dispatch(addTask(event.target[0].value))
        event.target[0].value = ''
        event.target[1].value = ''
      }} className="form">
        <input disabled={status === 'done' || status === 'important'} required placeholder="tasks" type='text' className='form__input' />
        <button disabled={status === 'done' || status === 'important'} type='submit' className='form__btn'>+</button>
      </form>

      <ul className='list'>
        {tasks.length === 0 ? <h3>Your todo list is empty</h3> :
          tasks.filter(item => item.title.includes(search.toLowerCase())).length === 0 ? <h3>Not Found</h3> :
            tasks.filter(item => {
              if (status === 'done') {
                return item.isDone
              } else if (status === 'important') {
                return item.isImportant
              } else {
                return item
              }
            })
              .map(item => (
                <li key={item.id} className="list__item">
                  <div>
                    <button type='button' style={{ background: item.isImportant ? 'lightcoral' : '' }} className='list__btn' onClick={() => dispatch(importantTask(item.id))}>Important</button>
                    <button type='button' style={{ background: item.isDone ? 'lightgreen' : '' }} className='list__btn' onClick={() => dispatch(doneTask(item.id))}>Done</button>
                  </div>
                  <div>
                    {item.change ?
                      <input onChange={(event) => setValue(event.target.value)} defaultValue={item.title} type='text' /> :
                      <span style={{
                        textDecoration: item.isDone ? 'line-through' : 'none',
                        color: item.isImportant ? 'lightcoral' : 'black'
                      }}>
                        {item.title}
                      </span>}
                    <button className='list__btn' type="button" onClick={() => dispatch(deleteTask(item.id))}>Delete</button>
                    <button className='list__btn' onClick={() => {
                      dispatch(editTask(value, item.id, item.change))
                      if (item.change) {
                        setValue('')
                      } else {
                        setValue(item.title)
                      }
                    }}>
                      {item.change ? 'save' : 'edit'}
                    </button>
                  </div>
                </li>
              ))}
      </ul>
      <div className='footer'>
        <button className='footer__btn' onClick={() => dispatch(deleteAllTasks())}>Удалить все</button>
        <h3>Количество тасков - {tasksCount}</h3>
      </div>
      <input value={search} type='text' className='form__input' onChange={(event) => setSearch(event.target.value)} />
      <div>
        <button type='button' onClick={() => setStatus('all')} style={{ background: status === 'all' ? '#8E49E8' : '' }}>All</button>
        <button type='button' onClick={() => setStatus('done')} style={{ background: status === 'done' ? '#8E49E8' : '' }}>Done</button>
        <button type='button' onClick={() => setStatus('important')} style={{ background: status === 'important' ? '#8E49E8' : '' }}>Important</button>
      </div>


    </div>
  );
}

export default App;
