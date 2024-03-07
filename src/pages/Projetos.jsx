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
    nomeCliente: "",
    objetivo: "",
    inicio: "",
    fim: "",
    valor: "",
    timeResponsavel: {
        id: ""
    }
}

const Projetos = () => {

    const { showMessage } = useContext(MessageContext);
    const { authApi } = useApi();
    const { handleSubmit, reset, setValue, control, resetField } = useForm({ defaultValues });
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [projetos, setProjetos] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [times, setTimes] = useState([]);


    const updateProjetos = () => {
        authApi.get("/projeto")
            .then(response => {
                setProjetos(response.data);
            })
            .catch(error => {
                showMessage("Nao foi possivel carregar os projetos", "error");
            })
    }

    useEffect(() => {
        updateProjetos();
        authApi.get("/time")
            .then(response => {
                setTimes(response.data);
            })
            .catch(error => {
                showMessage("Nao foi possivel carregar os projetos", "error");
            })
    }, []);

    const columns = [
        { field: 'nome', headerName: 'Nome', flex: 1 },
        { field: 'nomeCliente', headerName: 'Cliente', flex: 1 },
        { field: 'objetivo', headerName: 'Objetivo', flex: 2 },
        { field: 'inicio', headerName: 'Inicio', flex: 1 },
        { field: 'fim', headerName: 'Fim', flex: 1 },
        { field: 'valor', headerName: 'Valor', flex: 1 },
        {
            field: 'timeResponsavel.nome',
            headerName: 'Time Responsável',
            flex: 1,
            renderCell: ({row}) => {
                return row.timeResponsavel.nome
            }
        },
        {
            field: "actions",
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
                <Typography variant="h4" sx={{ display: "inline", mr: 2 }}>Projetos</Typography>
                <Button
                    variant="contained"
                    size="small"
                    color="success"
                    startIcon={<AddIcon />}
                    onClick={() => {
                        setSelectedId(null);
                        setCreateDialogOpen(true);
                    }}
                >
                    Cadastrar
                </Button>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <DataGrid
                rows={projetos}
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
                    <DialogTitle>{selectedId === null ? "Cadastro" : "Edição"} de Projeto</DialogTitle>
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
                                    name="nomeCliente"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Cliente"
                                        />)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="objetivo"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Objetivo"
                                        />)
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Controller
                                    name="inicio"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Inicio"
                                        />)
                                    }
                                />
                            </Grid>
                            {selectedId !== null &&
                            <Grid item xs={6}>
                                <Controller
                                    name="fim"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Fim"
                                        />)
                                    }
                                />
                            </Grid>}
                            <Grid item xs={6}>
                                <Controller
                                    defaultValue={""}
                                    name="valor"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Valor"
                                        />)
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="timeResponsavel">Time</InputLabel>
                                    <Controller
                                        defaultValue={[]}
                                        name="timeResponsavel.id"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                labelId="timeResponsavel"
                                                id="time-select"
                                                label="Time"
                                            >
                                                {times.map(time => (
                                                    <MenuItem key={`time-${time.id}`}
                                                              value={time.id}>
                                                        {time.nome}
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
export default Projetos;
