import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExecutorPage from './ExecutorPage';
import CustomerPage from './CustomerPage';

function App() {
  return (
    <Router>
            <Routes>
                <Route path="/" element={<ExecutorPage />} />
                <Route path="/customer" element={<CustomerPage />} />
            </Routes>
        </Router>
    );
}

export default App;
