import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography, Paper } from '@mui/material';
import { database } from './../database';
import { USER_SCEHMA } from './../database/schema'
import { Q } from '@nozbe/watermelondb';
import User from './../database/models/user'; // Ensure this path is correct
import { useAuth } from './../context/AuthContext'; // Import the Auth context
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const AuthPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const { login, handleLoginInDB, userId } = useAuth();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();


    useEffect(() => {
        if (userId) {
            navigate('/companies');
            handleLoginInDB(userId)
        }
    }, [userId])

    const resetField = () => {
        setEmail('')
        setName('')
        setPassword('')
    }
const displaySnakeBar=(message,variant)=>{
    enqueueSnackbar(message, { variant });
}
    const handleAuth = async () => {
        if (isLogin) {
            // Login logic
            const user = await database.collections.get(USER_SCEHMA).query(Q.where('email', email), Q.where('password', password)).fetch();
            if (user.length) {
                handleLoginInDB(user[0]._raw.id)
                login(user[0]._raw.id);
                navigate('/companies');
                displaySnakeBar('Login successful','success');
            } else {
                console.log('Invalid credentials');
                displaySnakeBar('Invalid credentials','error');
            }
        } else {
            // Signup logic
            const existingUser = await database.collections.get(USER_SCEHMA).query(Q.where('email', email)).fetch();
            if (existingUser.length) {
                console.log('Email already exists');
                displaySnakeBar('Email already exists','error');
            } else {
                await database.write(async () => {
                    await database.collections.get(USER_SCEHMA).create(user => {
                        const userData = User.createUser({ name, email, password });
                        //   user.id = userData.id; // Set the generated ID
                        user._raw.id = userData.id;
                        user.name = userData.name;
                        user.email = userData.email;
                        user.password = userData.password;
                    });
                });
                resetField();
                displaySnakeBar('Signup successful','success')
                console.log('Signup successful');
            }
        }
    };
    return (
        <Paper style={{ padding: 20, margin: 'auto', maxWidth: 400 }}>
            <Typography variant="h5">{isLogin ? 'Login' : 'Signup'}</Typography>
            {!isLogin && <TextField fullWidth margin="normal" value={name} onChange={e => setName(e.target.value)} label="Name" />}
            <TextField fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} label="Email" />
            <TextField
                fullWidth
                margin="normal"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                label="Password"
            />
            <Button variant="contained" color="primary" onClick={handleAuth}>
                {isLogin ? 'Login' : 'Signup'}
            </Button>
            <Button onClick={() => { setIsLogin(!isLogin); resetField(); }}>
                {isLogin ? 'Switch to Signup' : 'Switch to Login'}
            </Button>
        </Paper>
    );
};

export default AuthPage;
