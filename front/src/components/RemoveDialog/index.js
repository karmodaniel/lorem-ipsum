import React, { useState } from "react";
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  //DialogContent,
  DialogTitle,
} from "@material-ui/core";

function RemoveDialog( {openRemove, setOpenRemoveDialog, projectId} ) {

  const closeDialogRemoveProject = () => {
    setOpenRemoveDialog(false);
  };
  console.log('teste', projectId)

  const removeProject = async (projectId) => {
      console.log('dentro', projectId);
      const response = await axios.delete(`http://localhost:3001/lorem-invest/projects/${projectId}`);
      console.log(response);
      closeDialogRemoveProject();
    }

  return (
    <>
      <Dialog open={openRemove} onClose={closeDialogRemoveProject}>
        <DialogTitle id="alert-dialog-title">
          {"Tem certeza que deseja apagar este projeto?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={closeDialogRemoveProject} color="primary">
            Cancelar
          </Button>
          <Button onClick={ () => removeProject(projectId)} color="primary" autoFocus>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default RemoveDialog;
