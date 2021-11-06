import * as React from 'react';
import { useState } from "react";
import { Avatar, Button, CssBaseline, TextField, Paper, Box, Grid, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useInput } from "../hooks/useInput";
import { emptyText, time, validations, notValidText, failedText } from "../../constants";
import { debounce } from "../../utils";

import "./app.sass";


const theme = createTheme();

const App = () => {

    const { isDirty, isEmpty, emailError, onBlur, onChange, handleClick, showAutocomplete, setAutocomplete,
        textVerification, disabledButton, setEmailError, setValue, options } = useInput('', validations);

    const [inputValue, setInputValue] = useState('');

    const debounced = debounce(onChange, time, setEmailError);

    const disabled = !isDirty || disabledButton || isDirty && isEmpty || isDirty && emailError && !isEmpty;

    const helperText = isDirty && isEmpty ? emptyText : " " &&
    isDirty && emailError && !isEmpty ? notValidText : " " &&
    textVerification ? textVerification : " ";

    const error = isDirty && isEmpty || isDirty && emailError && !isEmpty || textVerification === failedText;

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Send email
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleClick} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="off"
                                autoFocus
                                onChange={(e) => {
                                    debounced(e);
                                    setInputValue(e.target.value);
                                }}
                                onBlur={onBlur}
                                helperText={helperText}
                                error={error}
                                value={inputValue}
                            />
                            {showAutocomplete
                                &&
                            <div className="autocomplete">
                                {options.map(domain =>
                                    <div
                                        className="autocomplete_option"
                                        key={domain}
                                        onClick={() => {
                                            const value = inputValue.slice(0, inputValue.indexOf("@") + 1);
                                            setInputValue(value + domain);
                                            setValue(value + domain);
                                            setAutocomplete(false);
                                        }}
                                    >
                                        {domain}
                                    </div>
                                )}
                            </div>}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={disabled}
                            >
                                Send email
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default App;
