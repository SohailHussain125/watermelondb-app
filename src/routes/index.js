import AuthPage from './../pages/authPage';
import CompanyPage from './../pages/companyPage';
import CarPage from './../pages/carPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import { Navbar } from './../components'
import PrivateRoute from './PrivateRoute'; // Import the PrivateRoute

export const AppRoutes = () => {
    return (
        <Router>
            <Navbar />
            <Container>
                <Routes>
                    <Route path="/" element={<AuthPage />} />
                    <Route path="/companies" element={<PrivateRoute element={<CompanyPage />} />} />
                    <Route path="/:id/cars" element={<PrivateRoute element={<CarPage />} />} />
                </Routes>
            </Container>
        </Router>
    )
}