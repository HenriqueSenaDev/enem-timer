import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Questions from './pages/questions';
import Essay from './pages/essay';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/questions/*' element={<Questions />} />
        <Route path='/essay' element={<Essay />} />
      </Routes>
    </Router>
  );
}

export default App;
