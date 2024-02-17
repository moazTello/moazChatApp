import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
// import Layout from './layout/Layout';
function App() {
  const { authUser } = useAuthContext();
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        {/* <Route path='/' element={<Layout/>}> */}
          <Route path='/' element={authUser ? <Home/> : <Navigate to='/login'/> }/>
          {/* <Route index element={authUser ? <Home/> : <Navigate to='/login'/> }/> */}

          <Route path='/login' element={authUser ? <Navigate to='/'/> : <Login/>}/>
          <Route path='/signup' element={authUser ? <Navigate to='/'/> : <Signup/>}/>
        {/* </Route> */}
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
