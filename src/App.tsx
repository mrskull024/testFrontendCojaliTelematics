import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ListaUsuarios } from "./components/ListaUsuarios"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ListaUsuarios />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
