import styled from 'styled-components';

export const ParentCategory = styled.div`
    border: 1px solid ${({ theme }) => theme.color.gray.dark};
    padding: ${({ theme }) => theme.spacing.xs}px;
    display: flex;
    justify-content: space-between;
`

export const Wrapper = styled.div`
    margin:${({ theme }) => theme.spacing.xs}px;
`