import { ToDoList } from './ToDoList/ToDoList'
import styles from './App.module.css'
import { useEffect, useState } from 'react';
import { Button } from './Button/Button';
import { fetchTodos } from './actions/todosActions';
import { useSelector, useDispatch } from 'react-redux';

export function App() {
  const todos = useSelector(state => state.todosState);
  const isLoading = useSelector(state => state.processesState.isLoading);
  const [addText, setAddText] = useState('');
  const [filterText, setFilterText] = useState('');
  const [filterKey, setFilterKey] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [refreshToDos, setRefreshToDos] = useState(false);
  const [isSorted, setIsSorted] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos(isSorted));
  }, [refreshToDos]);

  const addToDo = () => {
    setIsCreating(true);
    fetch('http://localhost:3005/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        id: Date.now(),
        title: addText,
      }),
    })
      .then(() => {
        setRefreshToDos(!refreshToDos)
        setAddText('')
      })
      .finally(() => setIsCreating(false));
  }

  const sortToDo = () => {
    setIsSorted(!isSorted)
    fetchTodos(!isSorted)
  }

  const filterTodo = () => {
    setFilterKey(filterText)
  }

  const onAddInputChange = (event) => {
    setAddText(event.target.value);
  }

  const filteredTodos = todos.filter((todo) => {
    return todo.title.toLowerCase().includes(filterKey.toLowerCase())
  })

  return (
    <div className={styles.app}>
      <div className={styles.appContainer}>
        <header className={styles.header}>
          <input className={styles.addInput} type="text" onChange={onAddInputChange} value={addText} placeholder='Добавьте задачу' />
          <Button onClick={addToDo} disabled={isCreating} className={styles.addButton}>Добавить</Button>
        </header>
        {isLoading
          ? <div className='loader'>Loading...</div>
          : <ToDoList todos={filteredTodos}
            onSortToDo={sortToDo}
            onFilterToDo={filterTodo}
            isSorted={isSorted}
            filterText={filterText}
            setFilterText={setFilterText} />
        }
      </div>
    </div>
  )
}
