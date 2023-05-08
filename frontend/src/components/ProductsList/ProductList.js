import styled from "styled-components"
import ProductCard from "./ProductCard"

const ProductsListWrapper = styled.div`
    display: flex;
    width: ${props => 20 * props.itemsPerRow}%;
    flex-wrap: wrap;
    column-gap: 24px;
    /* justify-content: space-between; */
    justify-items: flex-start;
`

const ProductsList = ({data, itemsPerRow}) => {
    return (
        <ProductsListWrapper itemsPerRow={itemsPerRow}>
            {data.map(item => {
                return <ProductCard data={item}/>
            })}
        </ProductsListWrapper>
    )
}

export default ProductsList;