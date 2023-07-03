import './App.css';
import {useState} from "react";
import axios from "axios";


function App() {
  const [nombre,setNombre] = useState("");
  const [descrip,setDescrip] = useState("");
  const [precio,setPrecio] = useState("");

  const [productosList,setproductos] = useState([]);

  
  const registrarProd = ()=>{
    axios.post("http://localhost:3001/create",{
      nombre:nombre,
      descrip:descrip,
      precio:precio
    }).then(()=>{
      alert("Nuevo producto agregado!");
    })
  }

  const getproductos = ()=>{
    axios.get("http://localhost:3001/productos").then((response)=>{
      setproductos(response.data);
    })
    .catch(error => {
      // Handle error
      console.error(error);
    });
  }
  getproductos();
  

  return (
    <div className="App">
        <h1>CRUD ~ Chilli Guajilli</h1>
  
        <div className="card">
          <label>Nombre: <input onChange={(event)=>{setNombre(event.target.value);}} type="text"/></label><br/>
          <label>Descripcion: <input onChange={(event)=>{setDescrip(event.target.value);}}type="text"/></label><br/>
          <label>Precio: <input onChange={(event)=>{setPrecio(event.target.value);}} type="number"/></label>
          <div>
            <button onClick={registrarProd}>Agregar</button>
            <button>Cancelar</button>
          </div>
        </div>
        <table class="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Nombre</th>
      <th scope="col">Descripcion</th>
      <th scope="col">Precio</th>
    </tr>
  </thead>
  <tbody>
    {
      productosList.map((val,key)=>{
        return <tr key={val.ID}>
            <th scope="row">{val.ID}</th>
            <td>{val.nombre}</td>
            <td>{val.descrip}</td>
            <td>${val.precio}</td>
            <td>
              <button type="submit">Editar</button>
              <button type="submit">Borrar</button>
            </td>
          </tr>
      })
    }
  </tbody>
</table>
  
    </div>
  );
}

export default App;
