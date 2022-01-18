import styled from "styled-components";

export const Description = styled.div`
    h1 {
        font-size: ${({theme}) => theme.size.high}px;
        margin: 0;
        };
    h2 {
        font-size: ${({theme}) => theme.size.medium}px;
        margin: 0;
        };
    font-family: 'Readex Pro', sans-serif;
    
`;

export const Wrapper = styled.div`
    display: block;
    text-align: center;
    div + div {
        padding: ${({theme}) => theme.spacing.xl}px;
    }
    Button {
        margin-top: ${({theme}) => theme.spacing.xl * 2}px;
    }
`;
