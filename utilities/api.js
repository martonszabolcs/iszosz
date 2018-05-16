var api = {
	lista(){
        return fetch("https://dry-mountain-15425.herokuapp.com/articles/", {
            headers: {
                
            }
        }).then((lista) => lista.json());
        console.log(lista)
    },



};
module.exports = api;