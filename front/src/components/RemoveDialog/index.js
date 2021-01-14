import React from "react";
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import { success, error } from '../../utils/toast'

function RemoveDialog( {openRemove, setOpenRemoveDialog, projectId} ) {

  const closeDialogRemoveProject = () => {
    setOpenRemoveDialog(false);
  };

  const removeProject = async (projectId) => {
      try {
        await axios.delete(`http://localhost:3001/lorem-invest/projects/${projectId}`);
        success("Projeto excluido com sucesso")
        closeDialogRemoveProject();
      } catch (e) {
        error("Erro ao deletar")
      }
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
