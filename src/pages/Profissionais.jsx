import { useContext, useEffect, useState } from "react";
import { Divider, IconButton, Typography, Button, Dialog, DialogContent, DialogActions, DialogTitle, Grid, TextField, Select, MenuItem, FormControl, InputLabel, Table, TableHead, TableBody, TableCell, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit.js";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from "@mui/x-data-grid";
import { Stack } from "@mui/system";
import { useForm, Controller } from "react-hook-form";
import { useApi } from "../services/api.js";
import MessageContext from "../contexts/messageContext.jsx";

const defaultValues = {
	nome: "",
	nascimento: "",
	etnia: "",
	genero: "",
	especialidade: {
    nome:""
  } ,
	endereco: {
		cidade: "",
		bairro: "",
		estado: "",
		rua: "",
		numero: ""
	}
}

const Profissionais = () => {

  const { showMessage } = useContext(MessageContext);
  const { authApi } = useApi();
  const { handleSubmit, reset, setValue, control, resetField } = useForm({ defaultValues });
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [profissionais, setProfissionais] = useState([]);
  const [selectedId, setSelectedId] = useState(null);


  const updateProfissionais = () => {
    authApi.get("/profissional")
      .then(response => {
        setProfissionais(response.data);
      })
      .catch(error => {
        showMessage("Nao foi possivel carregar os profissionais", "error");
      })
  }

  useEffect(updateProfissionais, []);

  const columns = [
    { field: 'nome', headerName: 'Nome', flex: 1 },
    { field: 'etnia', headerName: 'Etinia', flex: 1 },
    { field: 'nascimento', headerName: 'Data nascimento', flex: 1 },
    { field: 'genero', headerName: 'Gênero', flex: 1 },
    { field: 'especialidade', headerName: 'Especialidade', flex: 1, renderCell: ({row}) => {
      return row.especialidade.nome
    } },
    {
      field: 'endereco', headerName: 'Endereco', flex: 1, renderCell: ({ row }) => {
        return row.endereco.rua + ", " + row.endereco.bairro + ", " + row.endereco.numero + ", " + row.endereco.cidade + "-" + row.endereco.estado;
      }
    },
    {
      field: "actions",
      headerName: "Ações",
      renderCell: ({ row }) => {
        return (
          <>
            <IconButton onClick={() => {
              authApi.delete(`/profissional/${row.id}`)
                .then(response => {
                  showMessage("Profissional excluido com sucesso!");
                  updateProfissionais();
                })
                .catch(error => {
                  showMessage("Nao foi excluir este profissional!", "error");
                })
            }}>
              <DeleteIcon />
            </IconButton>

            <IconButton onClick={() => {
              setSelectedId(row.id);
              setCreateDialogOpen(true);
              for (let key in row) {
                setValue(key, row[key]);
              }
            }}>
              <EditIcon />
            </IconButton>
          </>
        );
      }
    }
  ];
  return (
    <>
      <Stack direction="row">
        <Typography variant="h4" sx={{ display: "inline", mr: 2 }}>Profissionais</Typography>
        <Button variant="contained" size="small" color="success" startIcon={<AddIcon />} onClick={() => setCreateDialogOpen(true)}>Cadastrar</Button>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <DataGrid
        rows={profissionais}
        columns={columns}
        getRowId={row => row.id}
        autoHeight={true}
      />

      <Dialog
        open={createDialogOpen}
        fullWidth={true}
        maxWidth="lg"
        onClose={() => {
          setSelectedId(null);
          setCreateDialogOpen(false);
          reset(defaultValues);
        }}
        scroll="paper"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Cadastro de Profissional</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <Controller
                  name="nome"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Nome"
                    />)
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="nascimento"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Data Nascimento"
                    />)
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="etnia">Etnia</InputLabel>
                  <Controller
                    defaultValue={[]}
                    name="etnia"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="etnia"
                        id="etnia-select"
                        label="Etnia"
                      >
                        <MenuItem value="BRANCO">Branco</MenuItem>
                        <MenuItem value="NEGRO">Negro</MenuItem>
                        <MenuItem value="AMARELO">Amarelo</MenuItem>
                        <MenuItem value="PARDO">Pardo</MenuItem>
                        <MenuItem value="OUTROS">Outros</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="genero">Genero</InputLabel>
                  <Controller
                    defaultValue={[]}
                    name="genero"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="genero"
                        id="genero-select"
                        label="Genero"
                      >
                        <MenuItem value="MASCULINO">Masculino</MenuItem>
                        <MenuItem value="FEMININO">Feminino</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <Controller
                  defaultValue={""}
                  name="especialidade.nome"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Especilidade"
                    />)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">Endereço</Typography>
                <Divider />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  defaultValue={""}
                  name="endereco.rua"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Rua"
                    />)
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  defaultValue={""}
                  name="endereco.numero"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Número"
                    />)
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  defaultValue={""}
                  name="endereco.bairro"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Bairro"
                    />)
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  defaultValue={""}
                  name="endereco.cidade"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Cidade"
                    />)
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  defaultValue={""}
                  name="endereco.estado"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Estado"
                    />)
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setSelectedId(null);
                setCreateDialogOpen(false);
                reset(defaultValues);
              }}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              type="submit">
              Confirmar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
export default Profissionais;