import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExecutorPage from './ExecutorPage';
import CustomerPage from './CustomerPage';
import MyResponsesPage from './MyResponsesPage';
import SignUpPage from './SignUpPage';
import ProfilePage from './ProfilePage';
import UserListPage from './UserListPage';

function App() {
  return (
    <Router>
            <Routes>
                <Route path="/" element={<ExecutorPage />} />
                <Route path="/customer" element={<CustomerPage />} />
                <Route path="/myresponses" element={<MyResponsesPage />} />
                <Route path="/registration" element={<SignUpPage />} />
                <Route path="/profile/:userId" element={<ProfilePage />} />
                <Route path='/userlist' element={<UserListPage />} />
            </Routes>
        </Router>
    );
}

export default App;
