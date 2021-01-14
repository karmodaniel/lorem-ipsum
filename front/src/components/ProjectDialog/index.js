import React, { useState, useEffect } from "react";
import "./index.css";
import ChipInput from "material-ui-chip-input";
import axios from "axios";
import moment from 'moment';

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


  useEffect(() => {
    console.log('--------------')
    console.log('idProject', idProject);
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
        console.log(response.data);
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
    const result = await axios.post('http://localhost:3001/lorem-invest/projects', body);
    console.log(result);
    handleClose();
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
    const response = await axios.put( `http://localhost:3001/lorem-invest/projects/${idProject}`, body)
    console.log(response);
    handleClose();
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
    console.log('true');
    if (idProject === '') {  
      setProjectName('');
      setInitialDate(new Date());
      setEndDate(new Date());
      setProjectValue(0);
      setRisk(0);
      setParticipants([]);
    }
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
            variant="outlined"
            onChange= {(event) => setProjectValue(event.target.value) }
            fullWidth
            className={ classes.inputValue }
          />
          <TextField
            id="outlined-select-currency"
            select
            label="Riscos"
            value={risk}
            onChange={ (event) => setRisk( event.target.value )}
            variant="outlined"
            className={classes.select}
          >
            {risks.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <ChipInput
            defaultValue={participants}
            onChange={(chips) => setParticipants(chips)}
            fullWidth={true}
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
