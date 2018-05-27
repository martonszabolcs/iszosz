var api = {
  lista() {
    return fetch("https://dry-mountain-15425.herokuapp.com/notes", {
      headers: {
        limit: 5,
        q: "Szabi"
      }
    }).then(lista => lista.json());
    console.log(lista);
  }
};
module.exports = api;
