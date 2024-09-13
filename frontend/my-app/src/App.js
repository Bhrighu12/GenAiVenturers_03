import {Route,BrowserRouter as Router,Routes} from 'react-router-dom';
import './App.css';
import HomePage from './pages/home';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
