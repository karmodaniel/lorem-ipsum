import React, {useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    MenuItem
  } from "@material-ui/core";
  import InputAdornment from '@material-ui/core/InputAdornment';
import {error} from '../../utils/toast'

function SimulateDialog({openSimulateDialog, setOpenSimulateDialog, project}) {
    const { name, projectValue, risk } = project;
    const [ investValue, setInvestValue ] = useState(0);
    const [ returnValue, setReturnValue ] = useState('');
     
    const closeDialogSimulate = () => {
        setOpenSimulateDialog(false);
        setReturnValue('');
    }

    const calcInvest = (risk, projectValue, investValue) => {
        if ( investValue > projectValue ) {
            if ( risk === 0 ){
                setReturnValue((investValue * 5) / 100);
                return (investValue * 5) / 100;
            } else if ( risk === 1 ) {
                setReturnValue((investValue * 10) / 100)
            } else {
                setReturnValue((investValue * 20) / 100)
                return ( investValue * 10 ) / 100;
            }
        } else {
          error("Valor não pode ser menor que o valor do projeto!")
            return 'Valor não pode ser menor que o valor do projeto!'
        }
    }

    const riskName = (riskNumber) => {
        if (riskNumber === 0) return "Baixo";
        if (riskNumber === 1) return "Médio";
    
        return "Alto";
      };
    
    return (
        <>
         <Dialog open={openSimulateDialog} onClose={closeDialogSimulate}>
        <DialogTitle id="alert-dialog-title">
          {`Simular Investimento - ${name}`}
        </DialogTitle>
        <DialogContent>
          <TextField
            id="name"
            label="Valor do investimento"
            type="number"
            variant="outlined"
            InputProps={{
              startAdornment: <InputAdornment position="start">R$</InputAdornment>,
            }}
            onChange= {(event) => {setInvestValue(event.target.value); setReturnValue('') }}
            fullWidth
            //className={ classes.inputValue }
          />

            <TextField
            id="name"
            label={`Valor do projeto: ${ projectValue}`}
            type="number"
            variant="outlined"
            disabled
            fullWidth
          />

          <TextField
            id="outlined-select-currency"
            select
            label="Riscos"
            value={risk}
            variant="outlined"
            disabled
            //className={classes.select}
          >

              <MenuItem value={risk}>
                {riskName(risk)}
              </MenuItem>

          </TextField>

          <TextField
            id="name"
            label= 'Valor do retorno'
            type="number"
            value={ returnValue ? returnValue : ""}
            
            InputProps={{
              startAdornment: returnValue ? <InputAdornment position="start">R$</InputAdornment>: null,
            }}
            //defaultValue={projectValue}
            variant="outlined"
            //onChange= {(event) => setProjectValue(event.target.value) }
            disabled
            fullWidth
            //className={ classes.inputValue }
          />


        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialogSimulate} color="primary">
            Cancelar
          </Button>
          <Button onClick={ () => calcInvest(risk, projectValue, investValue ) } color="primary" autoFocus>
            Simular
          </Button>
        </DialogActions>
      </Dialog>
        </>
    )
} 

export default SimulateDialog;