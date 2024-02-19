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
    <div className='p-4 min-h-screen flex items-center justify-center'>
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
// new repo
// echo "# moazChatApp" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/moazTello/moazChatApp.git
// git push -u origin main

// when you make any changes just git add . and git commit a new commit and run these lines
// existance repo
// git remote add origin https://github.com/moazTello/moazChatApp.git
// git branch -M main
// git push -u origin main