import React, {useState} from 'react';
import {Container, Card, CardContent, makeStyles, Grid, TextField, Button} from '@material-ui/core';
import QRCode from 'qrcode';

function App() {

  const [text, setText] = useState('');
  const [imageURL, setImageURL] = useState('');
  const classes = useStyles();
  const generateQrCode = async () => {
    try{
      const response = await  QRCode.toDataURL('test qr codigo para invitar a mis amigos');
      console.log(response);
    }catch(error){
      console.log(error);
    }
  }

  return (
    <Container className={classes.container}>
    <Card>
      <h2 className={classes.title}>Generador de códigos QR y descargas</h2>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <TextField label="Enter text here"  onChange={(e) => setText(e.target.value)}></TextField>
            <Button className={classes.btn} variant="contained" color="primary" 
              onClick={() => generateQrCode()}
            >Generar</Button>
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}></Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}></Grid>
          </Grid>


      </CardContent>
    </Card>
    </Container>
  );
}

const useStyles = makeStyles((theme) =>({
      container: {
        marginTop: 10
      },
      title:{
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
        background: '#00e5e5',
        color: 'white',
        padding: 20
      },
      btn:{
        marginTop: 10,
        marginBottom: 10


      }
}));
export default App;
