import React from 'react'
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { addUser, deleteUser, deleteAllUsers } from './redux/reducers/users'

function App() {

  const dispatch = useDispatch()
  const users = useSelector((store) => store.users.users);
  const usersCount = useSelector(store => store.users.usersCount)

  return (
    <div className="App">
      <h2>Количество юзеров - {usersCount}</h2>
      <button onClick={dispatch(deleteAllUsers())}>Удалить все</button>
      <ul>
        {users.map(item => (
          <li key={item.id}>
            <button type='button'>copy</button>
            {item.name}
            {/* <button type="button" onClick={() => dispatch(deleteUser(item.id))}>Delete</button> */}
          </li>
        ))}
      </ul>
      <form onSubmit={(event) => {
        event.preventDefault();
        dispatch(addUser(event.target[0].value, event.target[1].value))
        event.target[0].value = ''
        event.target[1].value = ''
      }}>
        <input placeholder="name" type='text' />
        <input placeholder="age" type='number' />
        <button type='submit'>Add</button>
      </form>
    </div>
  );
}

export default App;
