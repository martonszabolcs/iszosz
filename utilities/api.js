var api = {
  lista() {
    return fetch("https://dry-mountain-15425.herokuapp.com/notes", {
      headers: {
        limit: 5,
        q: "Szabi"
      }
    }).then(lista => lista.json());
    console.log(lista);
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
