const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_USERS':
      return action.payload
    case 'UPDATE_CURRENT_USER':
      console.log(state, 'current user', action.payload)
      return state.map((user) =>
        user._id === action.payload._id ? action.payload : user
      )
    default:
      return state
  }
}

export default usersReducer
