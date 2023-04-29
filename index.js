//https://jsonplaceholder.typicode.com/

//Cómo obtener datos desde un servidor
const botonAgregar = document.getElementById("agregar");
const botonAgregarTodos = document.getElementById("agregarTodos");
const listaPersonasElement = document.getElementById("listaPersonas");
const botonFormulario = document.querySelector("form");
const spinner = document.querySelector("img");
spinner.classList.toggle("escondido",true);

const API = "https://jsonplaceholder.typicode.com/users/";
let users = [];

/** Devuelve una lista de usuario del backend */
async function getUsers() {
  const res = await fetch(API);
  const resJson = await res.json();
  return resJson;
}

/** Devuelve un usuario del backend */
async function getUser(id) {
  const res = await fetch(API + id);
  const resJson = await res.json();
  return resJson;
}

/** Igual que getUsers pero sin async/await */
function getUsersThen() {
    const res = fetch(API)
      .then (res => res.json())
      .then (resJson => users = resJson);
}

botonAgregar.addEventListener("click", async () => {
  spinner.classList.toggle("escondido",false);
  const newUser = await getUser(users.length + 1);
  //console.log(newUser)
  if (newUser.name) {
    console.log(newUser.name);
    agregarPersonaPantalla(newUser);
    users.push(newUser);
  }
  spinner.classList.toggle("escondido",true);
});

botonAgregarTodos.addEventListener("click", async () => {
  spinner.classList.toggle("escondido",false);
  const newUsers = await getUsers();
  listaPersonasElement.innerHTML = "";
  //console.log(newUsers)
  if (newUsers.length > 0) {
    users = newUsers;
    users.forEach((user) => {
      agregarPersonaPantalla(user);
    });
  }
  spinner.classList.toggle("escondido",true);
});

botonFormulario.addEventListener("submit", async (e) => {
  e.preventDefault();
  spinner.classList.toggle("escondido",false);
  console.log(e);
  const info = {
    name: e.target[0].value,
  };
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });
  const resJson = await res.json();
  if (resJson.name) {
    agregarPersonaPantalla(resJson);
    users.push(resJson);
  }
  spinner.classList.toggle("escondido",true);
});

/** Agrega una persona a la lista de la pantalla */
function agregarPersonaPantalla(persona) {
  const p = document.createElement("p");
  p.innerText = persona.name;
  listaPersonas.appendChild(p);
}
