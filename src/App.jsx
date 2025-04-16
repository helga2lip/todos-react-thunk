import { ToDoList } from './ToDoList/ToDoList'
import styles from './App.module.css'
import { useEffect, useState } from 'react';
import { Button } from './Button/Button';
import { addTodo, fetchTodos } from './actions/todosActions';
import { useSelector, useDispatch } from 'react-redux';

export function App() {
  const todos = useSelector(state => state.todosState);
  const isLoading = useSelector(state => state.processesState.isLoading);
  const isCreating = useSelector(state => state.processesState.isCreating);
  const isSorted = useSelector(state => state.processesState.isSorted);

  const [addText, setAddText] = useState('');
  const [filterText, setFilterText] = useState('');
  const [filterKey, setFilterKey] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos(isSorted));
  }, []);

  const onAddTodo = () => {
    dispatch(addTodo(addText));
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
          <Button onClick={onAddTodo} disabled={isCreating} className={styles.addButton}>Добавить</Button>
        </header>
        {isLoading
          ? <div className='loader'>Loading...</div>
          : <ToDoList todos={filteredTodos}
            onFilterToDo={filterTodo}
            filterText={filterText}
            setFilterText={setFilterText} />
        }
      </div>
    </div>
  )
}
