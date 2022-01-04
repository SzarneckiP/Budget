import styled from "styled-components";

export const Grid = styled.div`
    display: flex;
    margin: ${({ theme }) => theme.spacing.xs}px;
    font-family: 'Readex Pro', sans-serif;
`;

export const Section = styled.section`
    margin: ${({ theme }) => theme.spacing.sm}px;
    :nth-child(1) {
        flex: 4;
    }
    :nth-child(2) {
        flex: 8;
    }
`;

export const Fragment = styled.div`
    margin-top: 10px;
    text-align: center;
`;
