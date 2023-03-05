import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Company from './components/pages/Company'
import Home from './components/pages/Home'
import NewClient from './components/pages/NewClient'
import Contact from './components/pages/Contact'
import NavBar from './components/layout/NavBar'

import Container from './components/layout/Container'
import Scheduler from './components/pages/scheduler/Scheduler'
import Footer from './components/layout/Footer'
import Project from './components/pages/scheduler/Project'
import NewPet from './components/pages/NewPet'
import Clients from './components/pages/Clients.'
import Client from './components/client/Client'
import Pets from './components/pages/Pets'
import NewPetService from './components/pages/NewPetService'
import PetServices from './components/pages/PetServices'
import PetService from './components/pages/PetService'
import Funcionario from './components/pages/funcionarios/Funcionario'
import Funcionarios from './components/pages/funcionarios/Funcionarios'
import NewFuncionario from './components/pages/funcionarios/NewFuncionario'
import NewScheduler from './components/pages/scheduler/NewScheduler'
import EditScheduler from './components/pages/scheduler/EditScheduler'
function App() {
  return ( 

    <Router>
      <NavBar/>

      <Container customClass="min-height">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/company" element={<Company/>}/>
          <Route path="/clients/new" element={<NewClient/>}/>
          <Route path="/clients" element={<Clients/>}/>
          <Route path="/client/:id" element={<Client/>}/>
          <Route path="/scheduler" element={<Scheduler/>}/>
          <Route path="/scheduler/new" element={<NewScheduler/>}/>
          <Route path="/scheduler/:id" element={<EditScheduler/>}/>
          <Route path="*" element={<h1>404 - Not Found</h1>}/>
          <Route path="/pets" element={<Pets/>}/>
          <Route path="/client/:id/pets/new" element={<NewPet/>}/>
          <Route path="/petservices" element={<PetServices/>}/>
          <Route path='/petservices/new' element={<NewPetService/>}/>
          <Route path='/petservices/:id' element={<PetService/>}/>
          <Route path='/funcionarios' element={<Funcionarios/>}/>
          <Route path='/funcionarios/new' element={<NewFuncionario/>}/>
          <Route path='/funcionario/:id' element={<Funcionario/>}/>
        </Routes>
        
      </Container>
      <Footer/>
    </Router>

   );
}

export default App;