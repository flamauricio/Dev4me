import axios from 'axios';

const apiUser = axios.create({
    baseURL: 'http://localhost:8080/usuarios'
});


const apiEmp = axios.create({
    baseURL: 'http://localhost:8080/empresas'
});

export default {apiUser, apiEmp};


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