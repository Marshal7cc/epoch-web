const TokenKey = 'access_token'

export default {
  getToken: function() {
    return localStorage.getItem(TokenKey)
  },

  setToken: function(token) {
    return localStorage.setItem(TokenKey, token)
  },

  removeToken: function() {
    return localStorage.removeItem(TokenKey)
  },

  clear: function() {
    return localStorage.clear()
  }
}
