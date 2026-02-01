import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import Sobre from './components/pages/Sobre'
import Contato from './components/pages/Contato'
import NovoProjeto from './components/pages/NovoProjeto'
import Projetos from './components/pages/Projetos'
import Projeto from './components/pages/Projeto'

import Container from './components/layout/Container'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'



function App() {
  return (
    <Router>
      <NavBar />
      <Container customClass="min-height">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/sobre" element={<Sobre />} />          
          <Route path="/novoprojeto" element={<NovoProjeto />} />
          <Route path="/projetos/:id" element={<Projeto />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  )

}

export default App
