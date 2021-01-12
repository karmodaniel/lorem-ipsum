import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';

import Menu from '@material-ui/core/Menu';
import { MenuItem, Button  } from '@material-ui/core';

import axios from "axios";
import './index.css';

import ProjectDialog from '../../components/ProjectDialog';
import logo from '../../assets/astronaut.svg';

import { FaEllipsisV, FaCalendarDay } from "react-icons/fa";
import { BiStats } from "react-icons/bi";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';



const useStyles = makeStyles((( theme ) => ({
   btn: {
     color: '#ffffff',
     backgroundColor: '#f8b96b',
     '&:hover': {
       backgroundColor: '#f8b96b'
     }
   }
})));

const StyledMenu = withStyles({
    paper: {
      backgroundColor: '#525CAF',
    },
  })(Menu);

const StyledMenuItem = withStyles(( theme ) => ({
    root: {
        backgroundColor: 'transparent',
        color: '#ffffff',
        '&:hover': {
            color: '#252525',
            backgroundColor: '#ffffff'
        }
    }
  }))(MenuItem);


function Cards() {
  const [projects, setProjects] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = () => {
    axios
      .get("http://localhost:3001/lorem-invest/projects")
      .then((data) => {
        setProjects(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const riskName = ( riskNumber ) => {
      if (riskNumber === 0 ) 
        return 'Baixo'
      if (riskNumber === 1)
        return 'Médio'
    
     return 'Alto'
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const closeDialog = ( state ) => {
    setOpen(state);
  };

  console.log("projects", projects);
  console.log("projects", projects.length);

  return (
    <>
    <div className="container">
      <StyledMenu
          id="simple-menu"
          anchorEl={ anchorEl }
          keepMounted
          open={ Boolean(anchorEl) }
          onClose={ handleClose }
          className={ classes.menu }
        >

          <StyledMenuItem onClick={ handleClose }>Editar</StyledMenuItem>
          <StyledMenuItem onClick={ handleClose }>Excluir</StyledMenuItem>
          <StyledMenuItem onClick={ handleClose }>Simular investimento</StyledMenuItem>
        </StyledMenu>

        <ProjectDialog showDialog={ open } closeDialog={ ( value ) => { closeDialog() }  }></ProjectDialog>

        <section className="menu">
          <div>
            <img src={logo} alt="Lorem Invest"></img>
          </div>

          <h1>Lorem Invest</h1>
        </section>

        <section className="actions">
          <Button className={ classes.btn } onClick={ () => handleClickOpen() } variant="contained">Cadastrar</Button>
        </section>


      <section className="card-container">
          { projects.map((project) => 
              ( 
              <div className="cards">
                  <h1> { project.name } </h1>

                <ul className="schedule">
                    <li>
                      <span className="icons"><FaCalendarDay></FaCalendarDay></span>
                      <h3> { project.initialDate } </h3>
                    </li>

                    <li>
                      <span className="icons"><BiStats></BiStats></span>
                      <h3> { riskName(project.risk) }</h3>
                    </li>
                </ul>
                    
                <div className="participants-container">
                    <div className="participants">
                          {project.participants.map((participant) => 
                              <div className="participants-names"> { participant.nome[0] }</div>
                          )}
                      </div>

                      <div className="icon-more" onClick={ handleClick }><FaEllipsisV></FaEllipsisV></div>
                  </div>

                  
                

              </div>
              )
          )}
      </section>
    </div>
     
    </>
  );
}

export default Cards;
