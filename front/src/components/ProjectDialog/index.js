import React, { useState, useEffect } from "react";
import "./index.css";
import ChipInput from "material-ui-chip-input";
import axios from "axios";
import moment from 'moment';
import InputAdornment from '@material-ui/core/InputAdornment';
import { error, success } from '../../utils/toast'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
} from "@material-ui/core";
  
  import { makeStyles } from "@material-ui/core/styles";

import DateFnsUtils from "@date-io/date-fns";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const risks = [
  {
    value: "0",
    label: "Baixo",
  },
  {
    value: "1",
    label: "Médio",
  },
  {
    value: "2",
    label: "Alto",
  },
];

const useStyles = makeStyles((theme) => ({
  inputValue: {
    maxWidth: 300,
  },
  goOn: {
    backgroundColor: '#2CBD94',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#2CBD94' 
    }
  },
  cancel: {
    backgroundColor: '#E74B6B',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#E74B6B' 
    }
  }
}));


function ProjectDialog({ showDialog, stateDialogEdit, idProject }) {
  const classes = useStyles();
  const [btnName, setBtnName] = useState('');

  const [title, setTitle] = useState("");
  const [projectName, setProjectName] = useState("");
  const [initialDate, setInitialDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [projectValue, setProjectValue] = useState(0);
  const [risk, setRisk] = useState("0");
  const [participants, setParticipants] = useState([]);
  const [erro, setError] = useState({});


  useEffect(() => {
    if (idProject === "") {
      setTitle("Cadastrar novo projeto");
      setBtnName('Cadastrar');
      setProjectName('');
      setInitialDate(new Date());
      setEndDate(new Date());
      setProjectValue(0);
      setRisk(0);
      setParticipants([]);
    } else {
      setTitle("Editar projeto");
      setBtnName('Editar');
      
      const loadData = async () => {
        const response = await axios.get(
          `http://localhost:3001/lorem-invest/projects/${idProject}`
        );
        
        setProjectName(response.data.name);
        setInitialDate(formatDateTimeStamp(response.data.initialDate));
        setEndDate(formatDateTimeStamp(response.data.endDate));
        setProjectValue(response.data.projectValue);
        setParticipants(response.data.participants);
      };

      loadData();
     
    }
  }, [idProject]);

  const registerProject = async () => {
    const body = {
      "name": projectName,
      "initialDate": formatDate(initialDate),
      "endDate": formatDate(endDate),
      "projectValue": projectValue,
      "risk": risk,
      "participants": participants
    }
    const errors = validateForm();
    if (errors) {
      error("Preencha todos os campos obrigatórios!");
      return false;
    }
    try {
      await axios.post('http://localhost:3001/lorem-invest/projects', body);
      success("Projeto criado com sucesso!")
      handleClose();
      
    } catch (e) {
      error("Ops deu error");
    }
  }

  const editProject = async () => {
    const body = {
      "name": projectName,
      "initialDate": formatDate(initialDate),
      "endDate": formatDate(endDate),
      "projectValue": projectValue,
      "risk": risk,
      "participants": participants
    }
    const errors = validateForm();
    if (errors) {
      error("Preencha todos os campos obrigatórios!");
      return false;
    }
    try {
      await axios.put( `http://localhost:3001/lorem-invest/projects/${idProject}`, body)
      success("Projeto atualizado com sucesso!")
      handleClose();
      
    } catch (e) {
      error("Ops deu error!")
    }
  }

  const formatDateTimeStamp = (date) => {
    const EnglishDate = moment(date,'DD-MM-YYYY').format('MM-DD-YYYY');
    return moment(EnglishDate).format();
  }

  const formatDate = (date) => {
    return  moment(date).format('DD/MM/YYYY');
  }

  const handleClose = () => {
    stateDialogEdit(false);
    showDialog = false;
    if (idProject === '') {  
      setProjectName('');
      setInitialDate(new Date());
      setEndDate(new Date());
      setProjectValue(0);
      setRisk(0);
      setParticipants([]);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (projectName.length === 0) {
      errors["projectName"] = true;
    }
    if (projectValue === 0) {
      errors["projectValue"] = true;
    }
    if (participants.length === 0) {
      errors["participants"] = true;
    }
    setError(errors);
    return Object.keys(errors).length;
  };

  return (
    <>
      <Dialog
        open={showDialog}
        onClose={handleClose}
      >
        <DialogTitle  id="form-dialog-title">{title}</DialogTitle>
        <DialogContent >
          <TextField
            id="name"
            label="Nome do projeto"
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
            variant="outlined"
            error={erro["projectName"]}
            fullWidth
          />

          <div className="dates">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="start-date"
                label="Data de início"
                value={ initialDate }
                onChange={ (date) => (setInitialDate(date)) }
                
              />
            </MuiPickersUtilsProvider>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="end-date"
                label="Data de término"
                value={ endDate }
                onChange={ (date) => (setEndDate(date)) }
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </div>

          <TextField
            id="name"
            label="Valor"
            type="number"
            defaultValue={projectValue}
            InputProps={{
              startAdornment: <InputAdornment position="start">R$</InputAdornment>,
            }}
            variant="outlined"
            onChange= {(event) => setProjectValue(event.target.value) }
            fullWidth
            error={erro["projectValue"]}
            className={ classes.inputValue }
          />
          <TextField
            id="outlined-select-currency"
            select
            label="Riscos"
            value={risk}
            onChange={ (event) => setRisk( event.target.value )}
            variant="outlined"
            error={erro["risk"]}
            className={classes.select}
          >
            {risks.map((option) => (
              <MenuItem key={option._id} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <ChipInput
            defaultValue={participants}
            onChange={(chips) => setParticipants(chips)}
            fullWidth={true}
            error={erro["participants"]}
            label="Participantes"
          />
        </DialogContent>
        <DialogActions >
          <Button onClick={handleClose} className={ classes.cancel }>
            Cancelar
          </Button>
          <Button onClick={idProject === "" ? registerProject : editProject} className={ classes.goOn }>
          { btnName }
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProjectDialog;
