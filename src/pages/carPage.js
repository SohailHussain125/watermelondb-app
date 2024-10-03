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
} from '@mui/material';
import { database } from './../database';
import { CAR_SCHEMA } from '../database/schema'
import { CarForm } from '../components';
import { useParams } from 'react-router-dom';
import { findCompanyByID } from './../database/helpers'
import withObservables from '@nozbe/with-observables'
import { observeCompany } from './../database/helpers'
import {switchMap} from 'rxjs';
import { useObservable } from 'rxjs-hooks';

const CarPage = () => {
    // const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentCar, setCurrentCar] = useState(null);
    const [company, setCompany] = useState(null);
    const { id } = useParams();

    const cars = useObservable(() => observeCompany(id).pipe(
        switchMap(company => company[0]?.car.observe())
    ), []);

    useEffect(() => {
        if (id) {
            fetchCars(id)
        }
    }, [id])

    const fetchCars = async (id) => {
        const company = await findCompanyByID(id)
        setCompany(company)

        // console.log("**", company)
        // console.log(company)
        // const cars = await company.car.fetch();
        // // console.log(cars, 'cars');

        // setCars(cars)

    }

    const handleDelete = async (carId) => {
        await database.write(async () => {
            const car = await database.collections.get(CAR_SCHEMA).find(carId);
            await car.destroyPermanently();
        });
        fetchCars(id);
    };

    const handleEdit = (car) => {
        setCurrentCar(car);
        setOpen(true);
    };

    const handleAdd = () => {
        setCurrentCar(null);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentCar(null);
    };

    const handleSubmit = () => {
        fetchCars(id);
        handleClose();
    };
    return (
        <Paper style={{ padding: 20 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}> <Typography variant="h6" gutterBottom>
                Car List
            </Typography>
                <Button variant="contained" color="primary" onClick={handleAdd}>
                    Add Car
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
                        {cars.map((car) => (
                            <TableRow key={car.id}>
                                <TableCell>{car.id}</TableCell>
                                <TableCell>{car.name}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleEdit(car)} color="primary">Edit</Button>
                                    <Button onClick={() => handleDelete(car.id)} color="secondary">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CarForm open={open} onClose={handleClose} car={currentCar} onSubmit={handleSubmit} company={company} id={id} />
        </Paper>
    );
};
// const enhance = withObservables( [],() =>  ({ 
//     cars: observeCompany('de40d5e2-d77b-4812-81aa-f56eb9be35a2').pipe(switchMap(cp =>cp[0]?.car.observe()))

// }))
// export default enhance(CarPage)


export default CarPage;
