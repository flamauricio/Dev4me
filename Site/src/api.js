import axios from 'axios';

const api = axios.create({
    baseURL: 'https://dev4me.ddns.net:8080'
});

export default api;


/* Rotas para usar no react com then e catch fundional
function getUsuario() {
  axios
    .get("http://52.45.218.11:8080/usuarios")
    .then((response) => {
      console.log(response.data);
    })

    .catch((error) => {
      console.log(error);
    });
}

function postUsuario() {
    axios
      .post("http://52.45.218.11:8080/usuarios")
      .then((response) => {
        console.log(response.status);
      })
  
      .catch((error) => {
        console.log(error.status);
      });
}
*/
