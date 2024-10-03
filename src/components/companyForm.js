import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import {database} from './../database'; 
import { useAuth } from './../context/AuthContext'; 

const CompanyForm = ({ open, onClose, company, onSubmit }) => {
  const [name, setName] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (company) {
      setName(company.name);
    } else {
      setName('');
    }
  }, [company]);

  const handleSubmit = async () => {
    if (company) {
      await database.write(async () => {
        const existingCompany = await database.collections.get('company').find(company.id);
        await existingCompany.update((c) => {
          c.name = name;
        });
      });
    } else {
        await user.createCompany({ name })
    }
    onSubmit(); 
    onClose(); 
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{company ? 'Edit Company' : 'Add Company'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Company Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {company ? 'Save' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompanyForm;
