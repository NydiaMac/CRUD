import './App.css';
import {useState} from "react";
import axios from "axios";


function App() {
  const [id,setId] = useState(0)
  const [nombre,setNombre] = useState("");
  const [descrip,setDescrip] = useState("");
  const [precio,setPrecio] = useState(0);
  const [productosList,setproductos] = useState([]);
  const [editar,setEditar] = useState(false);

  
  const registrarProd = ()=>{
    axios.post("http://localhost:3001/create",{
      nombre:nombre,
      descrip:descrip,
      precio:precio
    }).then(()=>{
      alert("Nuevo producto agregado!");
      cancelar();
    })
  }

  const cancelar = ()=>{
    setEditar(false);
    setId(0)
    setNombre("");
    setDescrip("");
    setPrecio(0);
  }
  const editarProd = (val) => {
    setEditar(true);
    setNombre(val.nombre);
    setDescrip(val.descrip);
    setPrecio(val.precio);
    setId(val.id); 
  }

  const actualizarProd = ()=>{
    axios.put("http://localhost:3001/update",{
      id:id,
      nombre:nombre,
      descrip:descrip,
      precio:precio
    }).then(()=>{
      getproductos();
      setEditar(false);
      cancelar();
    })
    .catch(error => {
      console.error(error);
    });
  }

  const eliminarProd = (id)=>{
    axios.delete(`http://localhost:3001/delete/${id}`).then(()=>{
      getproductos();
      cancelar();
    })
    .catch(error => {
      console.error(error);
    });
  }

  const getproductos = ()=>{
    axios.get("http://localhost:3001/productos").then((response)=>{
      setproductos(response.data);
    })
    .catch(error => {
      console.error(error);
    })
    ;
  }
  getproductos();
  

  return (
    <div className="App">
        <h1>CRUD ~ Chilli Guajilli</h1>
  
        <div className="card">
          <label>Nombre: <input value={nombre} onChange={(event)=>{setNombre(event.target.value);}} type="text"/></label><br/>
          <label>Descripcion: <input value={descrip} onChange={(event)=>{setDescrip(event.target.value);}}type="text"/></label><br/>
          <label>Precio: <input value={precio} onChange={(event)=>{setPrecio(event.target.value);}} type="number"/></label>
          <div>
            {
              editar?
              <button onClick={actualizarProd} class="btn btn-primary">Guardar</button>
              :
              <button onClick={registrarProd} class="btn btn-success">Agregar</button>
            }
            <button onClick={cancelar} class="btn btn-secondary">Cancelar</button>
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
            <th scope="row">{val.id}</th>
            <td>{val.nombre}</td>
            <td>{val.descrip}</td>
            <td>${val.precio}</td>
            <td>
              <button type="submit"
              onClick={()=>{
                editarProd(val)
              }} class="btn btn-warning">Editar</button>
              <button onClick={()=>{
                eliminarProd(val.id);
                }}type="submit" class="btn btn-danger">Borrar</button>
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
