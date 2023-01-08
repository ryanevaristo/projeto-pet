import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Company from './components/pages/Company'
import Home from './components/pages/Home'
import NewClient from './components/pages/NewClient'
import Contact from './components/pages/Contact'
import NavBar from './components/layout/NavBar'

import Container from './components/layout/Container'
import Projects from './components/pages/Projects'
import Footer from './components/layout/Footer'
import Project from './components/pages/Project'
import NewPet from './components/pages/NewPet'
import Clients from './components/pages/Clients.'
import Client from './components/client/Client'
import Pets from './components/pages/Pets'
import NewPetService from './components/pages/NewPetService'
import PetServices from './components/pages/PetServices'
import PetService from './components/pages/PetService'
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
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/project/:id" element={<Project/>}/>
          <Route path="*" element={<h1>404 - Not Found</h1>}/>
          <Route path="/pets" element={<Pets/>}/>
          <Route path="/pets/new" element={<NewPet/>}/>
          <Route path="/petservices" element={<PetServices/>}/>
          <Route path='/petservices/new' element={<NewPetService/>}/>
          <Route path='/petservices/:id' element={<PetService/>}/>
        </Routes>
        
      </Container>
      <Footer/>
    </Router>

   );
}

export default App;