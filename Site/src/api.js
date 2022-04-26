import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080'
});

export default api;


/* Rotas para usar no react com then e catch fundional
function getUsuario() {
  axios
    .get("http://localhost:8080/usuarios")
    .then((response) => {
      console.log(response.data);
    })

    .catch((error) => {
      console.log(error);
    });
}

function postUsuario() {
    axios
      .post("http://localhost:8080/usuarios")
      .then((response) => {
        console.log(response.status);
      })
  
      .catch((error) => {
        console.log(error.status);
      });
}
*/