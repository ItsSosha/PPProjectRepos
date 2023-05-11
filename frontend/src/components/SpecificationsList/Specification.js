
import styled from "styled-components"
import { Typography, Box } from "@mui/material"

const DottedFiller = styled.div`
position: absolute;
right: 16px;
bottom: 8px;
width: 100%;
border: 1px #221f1f dotted;
`

const Specification = ({spec}) => {
    return (
        <>
            <Box
                sx={{
                    position: "relative",
                    overflow: "hidden"
                }}>
                <Typography
                    component="span"
                    variant="subtitle1"
                    sx={{
                        backgroundColor: "#FFF",
                        position: "relative",
                        zIndex: 1,
                        pr: "16px",
                    }}>
                    {spec.Key}
                </Typography>
                <DottedFiller />
            </Box>
            <Typography
                sx={{
                    backgroundColor: "#FFF",
                    zIndex: 0
                }}
                variant="body2">
                {spec.Value}
            </Typography>
        </>
    )
}

export default Specification;