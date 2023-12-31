import Specification from "./Specification"
import styled from "styled-components"
const SpecificationsWrapper = styled.div`
display: grid;
grid-template-columns: repeat(2, 1fr);
`
const SpecificationsList = ({specs}) => {
    return (
        <SpecificationsWrapper>
            {specs.map(spec => {
                return <Specification spec={spec} key={spec.key}/>
            })}
        </SpecificationsWrapper>

    )
}

export default SpecificationsList;