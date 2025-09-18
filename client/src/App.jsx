import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateGame from './pages/CreateGame'
import UpdateGame from './pages/UpdateGame'
import NotFound from './pages/NotFound'

function App() {
  

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
                <Route path="/create" element={<CreateGame/>}/>
                        <Route path="/update/:id" element={<UpdateGame/>}/>
                                <Route path="*" element={<NotFound/>}/>



      </Routes>
    </div>
      
  );
}

export default App
