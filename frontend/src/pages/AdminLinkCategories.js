import { useEffect, useState } from 'react';
import Modal from '../components/Modal/Modal';
import ModalEditRawCategory from '../components/Modal/ModalEditRawCategory';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

const fetchCategories = async () => {
    const response = await fetch('https://pricely.tech/api/Category');
    return await response.json();
}

const fetchRawCategories = async () => {
    const response = await fetch('https://pricely.tech/api/Category/getAllRawCategories');
    return await response.json();
}

const updateRawCategory = async (categoryId, rawCategoryId) => {
    const response = await fetch(`https://pricely.tech/api/Category/bindCategory?categoryId=${categoryId}&rawCategoryId=${rawCategoryId}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    });

    if (!response.ok) {
        throw new Error();
    }

    return await fetchRawCategories();
}

const AdminLinkCategories = () => {

    const [rawCategories, setRawCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);

    const handleCategoryChange = (e, category) => {
        e.preventDefault();
        updateRawCategory(category, activeCategory?.id).then(setRawCategories);
        setActiveCategory(null);
    }

    useEffect(() => {
        fetchRawCategories().then(setRawCategories);
        fetchCategories().then(setCategories);
    }, [])

    return (
        <div>
            <Modal
                open={activeCategory != null}
                onModalClose={() => setActiveCategory(null)}>
                <ModalEditRawCategory categories={categories} onCategoryChange={handleCategoryChange} defaultCategory={activeCategory?.category?.id}/>
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
                        key={rawCategory.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {rawCategory.parsedName}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {rawCategory.category?.name ? rawCategory.category?.name : <span style={{color: "red"}}>Відсутня</span>}
                        </TableCell>
                        <TableCell align="right">
                            <Button
                                variant="contained"
                                color="secondary"
                                sx={{color: "#FFF"}}
                                onClick={() => setActiveCategory(rawCategory)}>
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