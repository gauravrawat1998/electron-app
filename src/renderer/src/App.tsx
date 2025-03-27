import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import EventList from './pages/EventList'

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<EventList />} />
      </Routes>
    </Router>
  )
}

export default App
