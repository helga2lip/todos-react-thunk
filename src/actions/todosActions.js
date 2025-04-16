export const fetchTodos = (isSorted = false) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_IS_LOADING',
      payload: true,
    })
    return fetch(`http://localhost:3005/todos${isSorted ? '?_sort=title' : ''}`)
      .then((loadedData) => loadedData.json())
      .then((loadedToDos) => {
        dispatch({
          type: 'FETCH_TODOS',
          payload: loadedToDos,
        });
      })
      .finally(() => {
        dispatch({
          type: 'SET_IS_LOADING',
          payload: false,
        })
      })
  };
};

export const deleteTodo = (id) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_IS_DELETING',
      payload: true,
    })
    return fetch(`http://localhost:3005/todos/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        dispatch({
          type: 'DELETE_TODO',
          payload: id,
        })
      })
      .finally(() => {
        dispatch({
          type: 'SET_IS_DELETING',
          payload: false,
        })
      })
  }
}

export const editTodo = (id, title) => {

  return (dispatch) => {
    dispatch({
      type: 'SET_IS_UPDATING',
      payload: true,
    })
    return fetch(`http://localhost:3005/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        id: id,
        title: title,
      }),
    })
      .then((data) => {
        return data.json();
      })
      .then((todo) => {
        dispatch({
          type: 'EDIT_TODO',
          payload: todo,
        })
      })
      .finally(() => {
        dispatch({
          type: 'SET_IS_UPDATING',
          payload: false,
        })
      })
  }
}