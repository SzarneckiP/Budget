import styled from 'styled-components';

export const Category = styled.div`
    border: 1px solid ${({ theme }) => theme.color.gray.dark};
    padding: ${({ theme }) => theme.spacing.xs}px;
    display: flex;
    justify-content: space-between;
`

export const ParentCategory = styled(Category)`
    background-color: ${({ theme }) => theme.color.gray.normal};  
`

export const Wrapper = styled.div`
    margin:${({ theme }) => theme.spacing.xs}px;
`

export const CategoryItem = styled(Category)`
    background-color: ${({ theme }) => theme.color.gray.light};

`