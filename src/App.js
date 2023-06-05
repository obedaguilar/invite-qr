import React, {useState, useRef} from 'react';
import {Container, Card, CardContent, makeStyles, Grid, TextField, Button} from '@material-ui/core';
import QRCode from 'qrcode';
import {QrReader} from 'react-qr-reader';

function App() {

  const [text, setText] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');
  const classes = useStyles();
  const qrRef = useRef(null);
  const [data, setData] = useState('No result');

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImageURL(response);
    } catch (error) {
      console.log(error);
    }
  }

  const handleErrorFile = (error) => {
    console.log(error);
  }

  const handleScanFile = (result) => {
    if (result) {
      setScanResultFile(result);
    }
  }

  const onScanFile = () => {
    qrRef.current.openImageDialog();
    
  }


  return (
    <Container className={classes.container}>
      <Card>
        <h2 className={classes.title}>Mis códigos QR OBED </h2>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <TextField label="Enter text here" onChange={(e) => setText(e.target.value)}
              
              ></TextField>
              <Button className={classes.btn} variant="contained" color="primary"
                onClick={() => generateQrCode()}
              >Generar</Button>
              {
                imageURL ? (
                  <a href={imageURL} download alt="img">
                    <img src={imageURL} alt="img" style={{ display: "flex" }} />
                  </a>)
                  : null
              }
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              {/* <Button type={"button"} className={classes.btn} variant='contained' color='secondary'>Escanear código QR</Button> */}
              <QrReader
                    ref={qrRef}
                    delay={300}
                    style={{width: '100%'}}
                    onError={handleErrorFile}
                    onScan={handleScanFile}
                    legacyMode
              />
                <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '100%' }}
      />
      <p>{data}</p>
              <h2>Scanear codigo: {scanResultFile}</h2>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}></Grid>
          </Grid>


        </CardContent>
      </Card>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 10
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'black',
    color: 'white',
    padding: 20
  },
  btn: {
    marginTop: 10,
    marginBottom: 10


  }
}));
export default App;
