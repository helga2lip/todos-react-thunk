import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../../Button/Button'
import { deleteTodo, editTodo } from '../../actions/todosActions';
import styles from './ToDo.module.css'

export function ToDo(props) {
  const dispatch = useDispatch();

  const isDeleting = useSelector(state => state.processesState.isDeleting);
  const isUpdating = useSelector(state => state.processesState.isUpdating);

  const onDeleteTodo = (id) => {
    dispatch(deleteTodo(id))
  }

  const onEditTodo = (id, title) => {
    const newTodoTitle = prompt('Отредактируйте задачу', title)
    if (!newTodoTitle) { return }
    dispatch(editTodo(id, newTodoTitle))
  }

  return <li className={styles.listItem}>
    <div className={styles.todoText}>{props.todo.title}</div>
    <Button onClick={() => onEditTodo(props.todo.id, props.todo.title)} disabled={isUpdating} className={styles.editButton}>Редактировать</Button>
    <Button onClick={() => onDeleteTodo(props.todo.id)} disabled={isDeleting} className={styles.deleteButton}>Удалить</Button>
  </li>
}