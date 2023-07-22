const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH':
      localStorage.setItem('Profile', JSON.stringify({ ...action?.data }))
      return null
    default:
      return null
  }
}

export default authReducer
