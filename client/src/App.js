//ROUTING
// BrowserRouter wraps everywhere we want to use the routing system
// Routes wraps all of our individual routes
// individual Route component creates a single route

import { BrowserRouter, Routes, Route } from 'react-router-dom';

//PAGES AND COMPONENTS
import Home from './pages/Home';
import CalendarPage from './pages/CalendarPage';
import Navbar from './components/nav/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className='pages'>
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
            path="/calendar"
            element={<CalendarPage />}
            />
          </Routes>
        </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
