import { useEffect, useState } from 'react';
import data from '../components/Sidebar/Categories'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField } from '@mui/material';


const AdminManageCategories = () => {

    const [categories, setCategories] = useState(data);
    const [categoryName, setCategoryName] = useState('');

    const handleAddCategory = e => {
        e.preventDefault();
        if (!categories.find(category => category.text.toUpperCase() == categoryName.toUpperCase())) {
            setCategories([...categories, {text: categoryName}]);
            setCategoryName('');
        }
    }

    const handleDeleteCategory = (index) => {
        const copy = [...categories];
        copy.splice(index, 1);
        setCategories(copy);
    }

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
                    <TextField name="newCategory" color='secondary' label="Нова категорія" variant="filled" value={categoryName} onChange={e => setCategoryName(e.target.value)}/>
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
                    {categories.map((category, index) => (
                        <TableRow
                        key={category.text}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {category.text}
                        </TableCell>
                        <TableCell align="right">
                            <Button
                                variant="contained"
                                color="error"
                                sx={{color: "#FFF"}}
                                onClick={() => handleDeleteCategory(index)}>
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