const InitialProcessesState = {
  isLoading: false,
  isDeleting: false,
  isCreating: false,
  isUpdating: false,
  isSorted: false,
}

export const processesReducer = (state = InitialProcessesState, action) => {
  switch (action.type) {
    case 'SET_IS_LOADING': {
      return {
        ...state,
        isLoading: action.payload,
      }
    }
    case 'SET_IS_DELETING': {
      return {
        ...state,
        isDeleting: action.payload,
      }
    }
    case 'SET_IS_CREATING': {
      return {
        ...state,
        isCreating: action.payload,
      }
    }
    case 'SET_IS_UPDATING': {
      return {
        ...state,
        isUpdating: action.payload,
      }
    }
    case 'SET_IS_SORTED': {
      return {
        ...state,
        isSorted: action.payload,
      }
    }
    default:
      return state;
  }
};