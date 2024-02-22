import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const RepoList = ({ username, currentPage, perPage }) => {
  const [repos, setRepos] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos`
        );
        const sortedRepos = response.data.sort((a, b) => b.size - a.size);
        setTotalPages(Math.ceil(sortedRepos.length / perPage));

        // Calcular los índices de inicio y fin para la página actual
        const startIndex = (currentPage - 1) * perPage;
        const endIndex = startIndex + perPage;

        const reposForPage = sortedRepos.slice(startIndex, endIndex);
        setRepos(reposForPage);
      } catch (error) {
        console.error("Error fetching repos:", error);
      }
    };

    fetchData();
  }, [username, currentPage, perPage]);

  return (
    <div>
      <h2>Top Repositorios de {username}</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre del Repositorio</TableCell>
              <TableCell>Tamaño</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repos.map((repo) => (
              <TableRow key={repo.id}>
                <TableCell>{repo.name}</TableCell>
                <TableCell>{repo.size}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

RepoList.propTypes = {
  username: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
};

export default RepoList;
