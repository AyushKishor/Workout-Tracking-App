import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import NewWorkout from './Pages/NewWorkout';
import Home from './Pages/Home';
import UpdateWorkout from './Pages/UpdateWorkout';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/newWorkout" element={<NewWorkout/>}/>
        <Route path="/updateWorkout" element={<UpdateWorkout/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
