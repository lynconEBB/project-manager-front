import { useState } from 'react'
import { Alert, Snackbar } from '@mui/material'
import Navigation from './layouts/Navigation/index.jsx';
import Profissionais from './pages/Profissionais.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import MessageContext from './contexts/messageContext.jsx';
import Times from "./pages/Times.jsx";
import Projetos from "./pages/Projetos.jsx";

const router = createBrowserRouter([
  { 
    path:"/",
    element: <Navigation/>,
    children: [
      { path:"/projetos", element: <Projetos/> },
      { path:"/times", element: <Times/> },
      { path:"/profissionais", element: <Profissionais/> },
    ]
  },
]);

export default function App() {

  const [messageOpen, setMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [severity, setSeverity] = useState("error");

  const showMessage = (value, severity) => {
    setMessageText(value);
    setSeverity(severity);
    setMessageOpen(true);
  }

  return (
    <>
    <MessageContext.Provider value={{showMessage}}>
      <RouterProvider router={router}/>
      <Snackbar open={messageOpen}
        autoHideDuration={6000}
        onClose={() => setMessageOpen(false)}>
        <Alert variant="filled" severity={severity}>{messageText}</Alert>
      </Snackbar>
    </MessageContext.Provider>
    </>
  )
}
