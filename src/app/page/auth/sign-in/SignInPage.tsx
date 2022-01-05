import React, {ReactElement} from "react";
import {Button, Grid, Paper} from "@mui/material";
import {AuthService} from "../../../service/AuthService";

export function SignInPage(): ReactElement {
    return (
        <Grid container component="main" sx={{'height': '100vh'}}>
            <Grid item
                  xs={false}
                  sm={4}
                  md={7}
                  sx={{
                      backgroundImage: 'url(https://source.unsplash.com/random)',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                  }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square container>
                <Grid item xs={12}/>
                <Grid item container textAlign="center">
                    <Grid xs={12} item>
                        <Grid item>
                            <Button sx={{width: 170}}
                                    size="medium"
                                    variant="outlined"
                                    onClick={() => AuthService.doLogin()}
                            >
                                Enter
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}