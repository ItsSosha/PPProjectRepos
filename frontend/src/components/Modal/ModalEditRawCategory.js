import { useState } from "react";
import { Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import styled from "styled-components";

const Form = styled.form`
display: flex;
align-items: center;
column-gap: 1em;
width: 40ch;
`

const ModalEditRawCategory = ({onCategoryChange, defaultCategory, categories}) => {

    const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

    return (
        <Form onSubmit={e => onCategoryChange(e, selectedCategory)}>
            <FormControl fullWidth color="secondary">
                <InputLabel id="category">Категорія</InputLabel>
                <Select
                    required
                    labelId="category"
                    value={selectedCategory ?? ''}
                    onChange={e => setSelectedCategory(e.target.value)}
                    label="Категорія"
                    sx={{
                        flex: '1 0 0',
                    }}>
                    {categories.map((category) => {
                        return (
                            <MenuItem value={category.id}>{category.name}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <Button
                variant="contained"
                color="secondary"
                sx={{
                    color: "#FFF"
                }}
                type="submit">
                Зберегти
            </Button>
        </Form>
    )
}

export default ModalEditRawCategory;