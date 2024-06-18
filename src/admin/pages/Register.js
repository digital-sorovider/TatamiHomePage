import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { auth, db } from '../../lib/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc } from "firebase/firestore"; 
import { AuthRouteProvider } from '../providers/AuthRouteProvider'


const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [registrationComplete, setRegistrationComplete] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;
            await setDoc(doc(db, "admin", uid), {
                email: userCredential.user.email,
                status: false,
            });

            setRegistrationComplete(true);
        } catch (error) {
            setError('登録に失敗しました');
        }
    }

    return (
        <AuthRouteProvider>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    bgcolor: 'background.default'
                }}
            >
                <Typography variant="h4" mb={2}>管理者アカウント登録</Typography>
                {registrationComplete ? (
                    <Typography variant="h6">
                        登録が完了しました。管理者からの承認をお待ち下さい
                    </Typography>
                ) : (
                    <Box component="form" onSubmit={handleRegister} width="80%" maxWidth={500} mb={2}>
                        <Box mb={2}>
                            <TextField 
                                type="email" 
                                label="Email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                fullWidth
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField 
                                type="password" 
                                label="Password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                fullWidth
                            />
                        </Box>
                        {error && <Typography color="error" mb={2}>{error}</Typography>}
                        <Button type="submit" variant="contained" fullWidth>登録</Button>
                    </Box>
                )}
            </Box>
        </AuthRouteProvider>
    )
}

export default RegisterPage;
