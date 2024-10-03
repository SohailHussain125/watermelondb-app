// src/CarForm.js
import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { database } from '../database'; 
import { useAuth } from '../context/AuthContext'; 
import {findCompanyByID} from './../database/helpers'
const CarForm = ({ open, onClose, car, onSubmit ,company,id}) => {
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [variant, setVariant] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (car) {
      setName(car.name);
      setModel(car.model);
      setColor(car.color);
      setVariant(car.variant);
    } else {
      setName('');
      setModel('');
      setColor('');
      setVariant('');
    }
  }, [car]);




  const handleSubmit = async () => {
    if (car) {
      // Update existing car
      await database.write(async () => {
        const existingCar = await database.collections.get('car').find(car.id);
        await existingCar.update((c) => {
          c.name = name;
          c.model = model;
          c.color = color;
          c.variant = variant;
        });
      });
    } else {
      // Create new car

      const resp = await company.createCar({ name ,model,color,variant})
      // await database.write(async () => {
      //   await database.collections.get('car').create((c) => {
      //     c.name = name;
      //     c.model = model;
      //     c.color = color;
      //     c.variant = variant;
      //     c.user_id = user.id; // Associate the car with the logged-in user
      //   });
      // });
    }
    onSubmit(); 
    onClose(); 
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{car ? 'Edit Car' : 'Add Car'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Car Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          label="Model"
          fullWidth
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          label="Color"
          fullWidth
          value={color}
          onChange={(e) => setColor(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          label="Variant"
          fullWidth
          value={variant}
          onChange={(e) => setVariant(e.target.value)}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {car ? 'Save' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CarForm;
