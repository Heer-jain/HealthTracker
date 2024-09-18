import { Route, Routes, Router } from "react-router-dom"
import Add from "./Pages/Add"
import Dashboard from "./Pages/Dashboard"
import Records from "./Pages/Records"
import Analytics from "./Pages/Analytics"
import Update from "./Pages/Update"
import { AuthProvider } from "./Context/AuthContext"


function App() {

  return (
    <AuthProvider>
    <Routes>
      <Route path="/add" element={<Add/>}/>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/records" element={<Records/>}/>
      <Route path="/analytics" element={<Analytics/>}/>
      <Route path="/update/:id" element={<Update/>}/>
    </Routes>
          </AuthProvider>
  )
}

export default App
