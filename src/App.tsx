import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TimerContextProvider } from './contexts/timer';
import Home from './pages/home';
import Questions from './pages/questions';
import './App.css';

function App() {
  return (
    <TimerContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/questions/infinity' element={<Questions />}/>
        </Routes>
      </Router>
    </TimerContextProvider>
  );
}

export default App;
