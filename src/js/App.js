import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExecutorPage from './ExecutorPage';
import CustomerPage from './CustomerPage';
import MyResponsesPage from './MyResponsesPage';
import SignUpPage from './SignUpPage';

function App() {
  return (
    <Router>
            <Routes>
                <Route path="/" element={<ExecutorPage />} />
                <Route path="/customer" element={<CustomerPage />} />
                <Route path="/myresponses" element={<MyResponsesPage />} />
                <Route path="/registration" element={<SignUpPage />} />
            </Routes>
        </Router>
    );
}

export default App;
