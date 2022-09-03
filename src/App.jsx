import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Company from './components/pages/Company'
import Home from './components/pages/Home'
import NewProject from './components/pages/NewProject'
import Contact from './components/pages/Contact'
import NavBar from './components/layout/NavBar'

import Container from './components/layout/Container'
import Projects from './components/pages/Projects'
import Footer from './components/layout/Footer'
import Project from './components/pages/Project'
function App() {
  return ( 

    <Router>
      <NavBar/>

      <Container customClass="min-height">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/company" element={<Company/>}/>
          <Route path="/newproject" element={<NewProject/>}/>
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/project/:id" element={<Project/>}/>
        </Routes>
        
      </Container>
      <Footer/>
    </Router>

   );
}

export default App;