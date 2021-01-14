import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Menu from "@material-ui/core/Menu";
import {
  MenuItem,
  Button,
} from "@material-ui/core";

import axios from "axios";
import "./index.css";
import RemoveDialog from '../../components/RemoveDialog';
import ProjectDialog from "../../components/ProjectDialog";
import SimulateDialog from '../../components/SimulateDialog';

import logo from "../../assets/astronaut.svg";

import { FaEllipsisV, FaCalendarDay } from "react-icons/fa";
import { BiStats } from "react-icons/bi";

const useStyles = makeStyles((theme) => ({
  btn: {
    color: "#ffffff",
    backgroundColor: "#f8b96b",
    "&:hover": {
      backgroundColor: "#f8b96b",
    },
  },
}));

const StyledMenu = withStyles({
  paper: {
    backgroundColor: "#525CAF",
  },
})(Menu);

const StyledMenuItem = withStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
    color: "#ffffff",
    "&:hover": {
      color: "#252525",
      backgroundColor: "#ffffff",
    },
  },
}))(MenuItem);

function Cards() {
  const classes = useStyles();

  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState([]);
  const [id, setId] = useState("");
  const [menu, setMenu] = useState(null);
  const [open, setOpen] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [openSimulateDialog, setOpenSimulateDialog] = useState(false);
  

  useEffect(() => {
    getProjects();
  });

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

  const riskName = (riskNumber) => {
    if (riskNumber === 0) return "Baixo";
    if (riskNumber === 1) return "Médio";

    return "Alto";
  };

  const menuTarget = (event, project) => {
    console.log(project);
    console.log(project._id);
    console.log(event.currentTarget);
    setId(project._id);
    setProject(project);
    setMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setMenu(null);
  };

  const stateDialogRegister = () => {
    setId("");
    setOpen(true);
  };

  const stateDialogEdit = (state) => {
    setOpen(state);
  };

  const openDialogRemoveProject = (state) => {
    setOpenRemoveDialog(state);
  };

  const OpenDialogSimulate = (state) => {
    setOpenSimulateDialog(state);
  }

  return (
    <>
      <div className="container">
        <ProjectDialog
          showDialog={open}
          idProject={id}
          stateDialogEdit={(value) => {
            stateDialogEdit();
          }}
        ></ProjectDialog>

        <RemoveDialog openRemove={ openRemoveDialog } setOpenRemoveDialog={setOpenRemoveDialog} projectId={ id }></RemoveDialog>

        <SimulateDialog 
        openSimulateDialog={ openSimulateDialog } 
        setOpenSimulateDialog={setOpenSimulateDialog}
        project={ project }
        >
        </SimulateDialog>

        <section className="menu">
          <div>
            <img src={logo} alt="Lorem Invest"></img>
          </div>

          <h1>Lorem Invest</h1>
        </section>

        <section className="actions">
          <Button
            className={classes.btn}
            onClick={() => stateDialogRegister()}
            variant="contained"
          >
            Cadastrar
          </Button>
        </section>

        <section className="card-container">
          {projects.map((project) => (
            <div className="cards" key={project.name}>
              <h1> {project.name} </h1>

              <ul className="schedule">
                <li>
                  <span className="icons">
                    <FaCalendarDay></FaCalendarDay>
                  </span>
                  <h3> {project.initialDate} </h3>
                </li>

                <li>
                  <span className="icons">
                    <BiStats></BiStats>
                  </span>
                  <h3> {riskName(project.risk)}</h3>
                </li>
              </ul>

              <div className="participants-container">
                <div className="participants">
                  {project.participants.map((participant) => (
                    <div className="participants-names" key={participant}>
                      {" "}
                      {participant[0].toLocaleUpperCase()}
                    </div>
                  ))}
                </div>

                <div className="icon-more" onClick={(e) => { menuTarget(e, project);}}>
                  <FaEllipsisV></FaEllipsisV>
                </div>
              </div>

              <StyledMenu
                id="simple-menu"
                anchorEl={() => menu}
                keepMounted
                open={Boolean(menu)}
                onClose={closeMenu}
                className={classes.menu}
              >
                <StyledMenuItem onClick={() => {stateDialogEdit(true);setMenu(false);}}>
                  Editar
                </StyledMenuItem>
                
                <StyledMenuItem onClick={() => {closeMenu(); openDialogRemoveProject(true)}}>
                  Excluir
                </StyledMenuItem>
                
                <StyledMenuItem onClick={() => {closeMenu(); OpenDialogSimulate(true)}}>
                  Simular investimento
                </StyledMenuItem>
              </StyledMenu>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

export default Cards;
