/*
  Issues (Temporal): It does not collect the saved data from the database 
                     into DataTable when the webAPP is refreshed.
*/

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
//import IconButton from '@mui/material/IconButton';
//import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react'
import axios from 'axios'
function App() {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:8000/')
    return setUsers(response.data)
  }
  const fetchUser = async (id) => {
    const response = await axios.get(`http://localhost:8000/${id}`)
    return setUser(response.data)
  }
  const createEditUser = async () => {
    if (user.id) {
      await axios.put(`http://localhost:8000/${user.id}`, user)
    } else {
      await axios.post(`http://localhost:8000/`, user)
    }
    await fetchUsers()
    await setUser({ id: 0, username: '', email: '', password: '', phone: '' })
  }
  const deteleUser = async (id) => {
    await axios.delete(`http://localhost:8000/${id}`)
    return fetchUsers()
  }
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FastAPI + REACT.js + MySQL
          </Typography>
          <Button color="inherit">Users</Button>
        </Toolbar>
      </AppBar>
      <Box mx={10}>
        <TableContainer>
          <TextField value={user.id} type="hidden" />
          <Table aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell>
                  <TextField value={user.username} onChange={(e) => setUser({ ...user, username:e.target.value })} id="outlined-basic" label="Username" variant="outlined" />
                </TableCell>
                <TableCell>
                  <TextField value={user.email} onChange={(e) => setUser({ ...user, email:e.target.value })} id="outlined-basic" label="Email" variant="outlined" />
                </TableCell>
                <TableCell>
                  <TextField value={user.password} onChange={(e) => setUser({ ...user, password:e.target.value })} id="outlined-basic" label="Password" variant="outlined" />
                </TableCell>
                <TableCell>
                  <TextField value={user.phone} onChange={(e) => setUser({ ...user, phone:e.target.value })} id="outlined-basic" label="Phone" variant="outlined" />
                </TableCell>
                <TableCell>
                  <Button onClick={()=> createEditUser()} variant="contained" endIcon={<SendIcon />}>
                    Enviar
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Editar</TableCell>
                <TableCell>Eliminar</TableCell>
              </TableRow>
              {users.map((row) => (
                <TableRow
                  key={row.id}>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.password}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>
                    <Button onClick={()=> fetchUser(row.id)} variant="contained">Editar</Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={()=> deteleUser(row.id)} variant="outlined" startIcon={<DeleteIcon />}>
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default App;
