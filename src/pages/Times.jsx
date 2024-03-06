import { useContext, useEffect, useState } from "react";
import { Divider, IconButton, Typography, Button, Dialog, DialogContent, DialogActions, DialogTitle, Grid, TextField, Select, MenuItem, FormControl, InputLabel, Table, TableHead, TableBody, TableCell, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit.js";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from "@mui/x-data-grid";
import { Stack } from "@mui/system";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useForm, Controller } from "react-hook-form";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useApi } from "../services/api.js";
import MessageContext from "../contexts/messageContext.jsx";

const defaultValues = {
    nome: "",
    integrante: []
}

const Times = () => {

    const { showMessage } = useContext(MessageContext);
    const { authApi } = useApi();
    const { handleSubmit, reset, setValue, control, resetField } = useForm({ defaultValues });
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [integranteDialogOpen, setIntegranteDialogOpen] = useState(false);
    const [times, setTimes] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [todosProfissionais, setTodosProfissionais] = useState([]);
    const [profissionaisDisponiveis, setProfissionaisDisponiveis] = useState([]);
    const [acao, setAcao] = useState("cadastro");

    const updateTimes = () => {
        authApi.get("/time")
            .then(response => {
                setTimes(response.data);
            })
            .catch(error => {
                showMessage("Nao foi possivel carregar os times", "error");
            })
    }

    useEffect(() => {
        updateTimes();
        authApi.get("/profissional")
            .then(response => {
                setTodosProfissionais(response.data);
            })
            .catch(error => {
                console.log(error);
                showMessage("Não foi possivel carregar os profissionais", "error");
            })
    }, []);


    const columns = [
        { field: 'nome', headerName: 'Nome', flex: 1 },
        {
            field: "actions",
            width: 175,
            headerName: "Ações",
            renderCell: ({ row }) => {
                return (
                );
            }
        }
    ];


    return (
        <>
            <Stack direction="row">
                <Typography variant="h4" sx={{ display: "inline", mr: 2 }}>Times</Typography>
                <Button variant="contained" size="small" color="success" startIcon={<AddIcon />} onClick={() => {setCreateDialogOpen(true); setAcao("cadastro")}}>Cadastrar</Button>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <DataGrid
                rows={times}
                columns={columns}
                getRowId={row => row.id}
                autoHeight={true}
            />

            <Dialog open={integranteDialogOpen}
                    fullWidth={true}
                    maxWidth="lg"
                    onClose={() => {
                        reset(defaultValues)
                       setIntegranteDialogOpen(false);
                    }}
                    scroll="paper"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>{acao === "adicao" ? "Adicionar" : "Remover"} integrante</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2} sx={{mt: 1}}>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="integrante">Integrante</InputLabel>
                                    <Controller
                                        defaultValue={[]}
                                        name="integrante"
                                        control={control}
                                        render={({field}) => (
                                            <Select
                                                {...field}
                                                labelId="integrante"
                                                id="integrante-select"
                                                label="Integrante"
                                            >
                                                {profissionaisDisponiveis.map(profissional => (
                                                    <MenuItem key={`profissional-${profissional.id}`}
                                                              value={profissional.id}>
                                                        {profissional.nome}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                setIntegranteDialogOpen(false);
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


               );
}
export default Times;
