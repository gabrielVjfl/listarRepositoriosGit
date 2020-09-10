import React, {useState} from 'react';

import './App.css';
import Axios from 'axios'
import Moment from 'moment'

function App() {

  const [state, setState] = useState({posts: []})

  const [alert, setAlert] = useState('')

const ConsultarRepo = (e) => {
  e.preventDefault()

  let perfil = document.getElementById('nameperfil').value

  Axios.get(`https://api.github.com/users/${perfil}/repos`).then(response => {
    console.log(response)

    setState({
      posts: response.data
    })
    setAlert(
      '' // seta com nada
    )

  }).catch(err => {
    console.log(err)
    setAlert(
      'Repositorio não encontrado' // exibe essa mensagem
    )
    setState({
      posts: []
    })
    
  })
  setState(state)
}

const handleChange = (e) => {
  setState({...state, [e.target.name]: e.target.value})
}
  
const {posts} = state 

  return (
    <div className="App">
       <h1>Listagem de Repositórios GitHub</h1>
       <br/>
<input autofocus="on" onChange={handleChange} className="form-control" name="search" id="nameperfil" placeholder="Digite o nome do perfil"></input>
<br/>
<button onClick={ConsultarRepo}  id="btn" class="btn btn-primary">Pesquisar</button>
<br/>
<br/>
  <h5>{posts.length == '0' ? posts.length == '' : posts.length}</h5>

  <h6>{alert}</h6>
    
<br/>
{
  posts.map((posts, index) => 
  <ul>
    <br/>
    
    <br/>
   
<li>Número {index + 1}</li>
    <li><font color="blue">NOME :</font>   {posts.name}</li>
    <br/>
  <li><font color="blue">DATA DE CRIAÇÃO : </font> {Moment( posts.created_at).format('DD-MM-YYYY')}</li>
 <hr></hr>
  </ul>
  )
}
    </div>
  );
}

export default App;
