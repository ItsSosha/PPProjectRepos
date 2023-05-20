import styled from "styled-components"
import ProductCard from "./ProductCard"
import { useMemo } from "react"

const ProductsListWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.itemsPerRow}, 1fr);
    grid-auto-flow: row;
    gap: 24px;
    width: 100%;
    align-items: center;
`

const ProductsList = ({data, itemsPerRow, page = 1, rows = 1}) => {

    // const displayData = useMemo(() => {
    //     return data.slice(itemsPerRow * rows * (page - 1), itemsPerRow * rows * page);
    //     // eslint-disable-next-line
    // }, [page, data]);

    return (
        <ProductsListWrapper itemsPerRow={itemsPerRow}>
            {data.map(item => {
                return <ProductCard data={item} key={item.id}/>
            })}
        </ProductsListWrapper>
    )
}

export default ProductsList;