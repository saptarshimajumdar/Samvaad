import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Blog from './pages/Blog';
import Post from './pages/Post';
const App=() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/post' element={<Post />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;
