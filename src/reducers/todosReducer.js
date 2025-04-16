const initialTodosState = [];

export const todosReducer = (state = initialTodosState, action) => {
  switch (action.type) {
    case 'FETCH_TODOS': {
      return action.payload
    }
    case 'DELETE_TODO': {
      return state.filter((todo) => {
        return todo.id !== action.payload
      })
    } case 'EDIT_TODO': {
      const indexToEdit = state.findIndex((todo) => {
        return todo.id === action.payload.id
      })
      const newArray = [...state];
      newArray.splice(indexToEdit, 1, action.payload);
      return newArray;
    }
    case 'ADD_TODO': {
      return [...state, action.payload]
    }
    default:
      return state;
  }
};