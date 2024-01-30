import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Questions from './pages/questions';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/questions/infinity' element={<Questions />} />
      </Routes>
    </Router>
  );
}

export default App;
