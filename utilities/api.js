var api = {
  lista() {
    return fetch("https://iszosz.herokuapp.com/notes", {
      headers: {
        limit: 50
      }
    }).then(lista => lista.json());
    console.log(lista);
  },
  logout() {
    return fetch("https://iszosz.herokuapp.com/users/1/logout", {}).then(
      logout => logout.json()
    );
    console.log(logout);
  },
  users() {
    return fetch("https://iszosz.herokuapp.com/users", {
      method: "GET",
      headers: {}
    }).then(users => users.json());
    console.log(users);
  },
  me(token) {
    return fetch("https://dry-mountain-15425.herokuapp.com/users/me", {
      headers: {
        Authorization: "Bearer " + token
      }
    }).then(me => me.json());
    console.log(me);
  },

  users(token) {
    return fetch("https://dry-mountain-15425.herokuapp.com/users", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(user => user.json());
  }
};
module.exports = api;
