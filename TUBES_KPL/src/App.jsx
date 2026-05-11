import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './components/AuthLayout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App