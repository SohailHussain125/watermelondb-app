import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button,
    Box,
} from '@mui/material'; import { database } from './../database';
import { useAuth } from './../context/AuthContext';
import { COMPANY_SCHEMA } from '../database/schema'
import { CompanyForm } from '../components';
import { useNavigate } from 'react-router-dom';
import withObservables from '@nozbe/with-observables';

const CompanyPage = (props) => {
    console.log(props)
    const { user } = useAuth();
    const [companies, setCompanies] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentCompany, setCurrentCompany] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        if (user) {
            fetchCompanies()
        }
    }, [user])

    const fetchCompanies = async () => {
        console.log(user,'>>>')
        setCompanies(await user.company.fetch())

    }

    const handleDelete = async (id) => {
        await database.write(async () => {
            const company = await database.collections.get(COMPANY_SCHEMA).find(id);
            await company.destroyPermanently();
        });
        fetchCompanies();
    };

    const handleEdit = (company) => {
        setCurrentCompany(company);
        setOpen(true);
    };

    const handleAdd = () => {
        setCurrentCompany(null);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentCompany(null);
    };

    const handleSubmit = () => {
        fetchCompanies();
        handleClose();
    };
    const handleView = (company) => {
        navigate(`/${company.id}/cars`)
    }
    return (
        <Paper style={{ padding: 20 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}> <Typography variant="h6" gutterBottom>
                Company List
            </Typography>
                <Button variant="contained" color="primary" onClick={handleAdd}>
                    Add Company
                </Button> </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companies.map((company) => (
                            <TableRow key={company.id}>
                                <TableCell>{company.id}</TableCell>
                                <TableCell>{company.name}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleView(company)} color="success">View</Button>
                                    <Button onClick={() => handleEdit(company)} color="primary">Edit</Button>
                                    <Button onClick={() => handleDelete(company.id)} color="secondary">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CompanyForm open={open} onClose={handleClose} company={currentCompany} onSubmit={handleSubmit} />
        </Paper>
    );
};

export default CompanyPage;


// const enhance = withObservables(['user'], ({user}) => ({
//     company: user.company.observe(),
// }));

// export default enhance(CompanyPage);
