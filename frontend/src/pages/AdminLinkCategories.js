import { useEffect, useState } from 'react';
import Modal from '../components/Modal/Modal';
import ModalEditRawCategory from '../components/Modal/ModalEditRawCategory';
import data from '../components/Sidebar/Categories'
import rawCategoriesSource from '../utils/rawCategories';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField } from '@mui/material';

const AdminLinkCategories = () => {

    const [rawCategories, setRawCategories] = useState(rawCategoriesSource);
    const [activeCategory, setActiveCategory] = useState(null);

    const handleCategoryChange = (e, category) => {
        e.preventDefault();
        const copy = [...rawCategories];
        const itemCopy = {...copy[activeCategory], category}
        copy[activeCategory] = itemCopy;

        setRawCategories(copy);
        setActiveCategory(null);
    }

    return (
        <div>
            <Modal
                open={activeCategory != null}
                onModalClose={() => setActiveCategory(null)}>
                <ModalEditRawCategory onCategoryChange={handleCategoryChange} defaultCategory={rawCategories[activeCategory]?.category}/>
            </Modal>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Категорія Магазину</TableCell>
                        <TableCell align="left">Vendor</TableCell>
                        <TableCell align="left"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rawCategories.map((rawCategory, index) => (
                        <TableRow
                        key={rawCategory.name + rawCategories.category}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {rawCategory.parsedName}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {rawCategory.category ? rawCategory.category : <span style={{color: "red"}}>Відсутня</span>}
                        </TableCell>
                        <TableCell align="right">
                            <Button
                                variant="contained"
                                color="secondary"
                                sx={{color: "#FFF"}}
                                onClick={() => setActiveCategory(index)}>
                                    Редагувати
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

export default AdminLinkCategories;