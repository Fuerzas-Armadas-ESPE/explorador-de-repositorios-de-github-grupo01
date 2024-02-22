import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  AppBar,
  Toolbar,
  Paper,
  Pagination,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import RepoList from "./components/RepoList";

function App() {
  const [username, setUsername] = useState("");
  const [showRepoList, setShowRepoList] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5); // Define la cantidad de repositorios por página


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setShowRepoList(true);
    setCurrentPage(1); // Reinicia a la primera página al realizar una nueva búsqueda

  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#ce6b5d" }}>
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography variant="h6" component="div" sx={{ color: "#FFF" }}>
            Mi Explorador de Repositorios - Escobar Juliana - Espin Marco
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs" sx={{ marginTop: "50px" }}>
        <Paper elevation={3} sx={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#7b9971" }}>
          <Typography component="h1" variant="h5" sx={{ marginBottom: "20px", color: "#fff" }}>
            Buscar Repositorios
          </Typography>
          <form onSubmit={handleFormSubmit} sx={{ width: "100%" }}>
            <TextField
              label="Nombre de Usuario"
              variant="outlined"
              value={username}
              onChange={handleUsernameChange}
              fullWidth
              sx={{ marginBottom: "20px", backgroundColor: "#ffefb9" }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#34502b",
                color: "#FFF",
                "&:hover": {
                  backgroundColor: "#ffefb9", // Cambia a tu color deseado al pasar el ratón
                  color: "black"
                },
              }}
            >
              Buscar Repositorios
            </Button>
          </form>
          </Paper>
          {showRepoList && <RepoList username={username} currentPage={currentPage} perPage={perPage} />}
          {showRepoList && (
            <Pagination
              count={10} // Define el total de páginas (puedes ajustarlo según tus necesidades)
              page={currentPage}
              onChange={handlePageChange}
              sx={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
            />
          )}
        </Container>
    </div>
  );
}

export default App;
