import styled from "styled-components";

export const DescriptionNF = styled.div`
    text-align: center;
    font-size: ${({theme}) => theme.size.medium}px;
    font-family: 'Readex Pro', sans-serif;
    
`;

export const Wrapper = styled.div`
    display: block;
    padding: ${({theme}) => theme.spacing.xl}px;
`;

export const Description404 = styled(DescriptionNF)`
font-size: ${({theme}) => theme.size.high}px;
`;
