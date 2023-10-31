import React from 'react'
import CrdTask from './CrdTask/CrdTask'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Emp_Form from './Emp_Form/Emp_Form'
import Complain from './Complain/Complain'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<CrdTask/>}></Route>
        <Route path='/company/:id' element={<Emp_Form/>}></Route>
        <Route path='/complain/:id' element={<Complain/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
