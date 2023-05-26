import { useEffect, useState } from 'react';
// import data from '../components/Sidebar/Categories'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField } from '@mui/material';
import { useAuthContext } from '../auth/auth';

const fetchCategories = async () => {
    const response = await fetch('https://pricely.tech/api/Category');
    return await response.json();
}

const deleteCategory = async (jwt, id) => {
    const responseDel = await fetch(`https://pricely.tech/api/Category?categoryId=${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jwt)
    });

    if (!responseDel.ok) {
        throw new Error();
    }

    return await fetchCategories();
}

const addCategory = async (jwt, name) => {
    console.log(name);
    const responseAdd = await fetch(`https://pricely.tech/api/Category?categoryName=${name}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jwt)
    });

    if (!responseAdd.ok) {
        throw new Error();
    }

    return await fetchCategories();
}

const AdminManageCategories = () => {

    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const { user } = useAuthContext();

    const handleAddCategory = e => {
        e.preventDefault();
        if (!categories.find(category => category.name.toUpperCase() == categoryName.toUpperCase())) {
            addCategory(user?.jwt, categoryName).then(setCategories);
            setCategoryName('');
        }
    }

    const handleDeleteCategory = (id) => {
        // const copy = [...categories];
        // copy.splice(index, 1);
        // setCategories(copy);
        deleteCategory(user?.jwt, id).then(setCategories);
    }

    useEffect(() => {
        fetchCategories()
            .then(setCategories);
    }, []);

    return (
        <div>
            <Paper
                component="form"
                onSubmit={handleAddCategory}
                sx={{

                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                    p: 1
                }}>
                    <TextField required name="newCategory" color='secondary' label="Нова категорія" variant="filled" value={categoryName} onChange={e => setCategoryName(e.target.value)}/>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                            color: "#FFF"
                        }}
                        type='submit'
                    >
                        Додати
                    </Button>
            </Paper>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Категорія</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {categories.map(category => (
                        <TableRow
                        key={category.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {category.name}
                        </TableCell>
                        <TableCell align="right">
                            <Button
                                variant="contained"
                                color="error"
                                sx={{color: "#FFF"}}
                                onClick={() => handleDeleteCategory(category.id)}>
                                    Видалити
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default AdminManageCategories;