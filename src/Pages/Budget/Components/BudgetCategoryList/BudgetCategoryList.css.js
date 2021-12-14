import styled from 'styled-components';

export const Category = styled.div`
    border-bottom: 1px solid ${({ theme }) => theme.color.gray.dark};
    padding: ${({ theme }) => theme.spacing.xs}px;
    display: flex;
    justify-content: space-between;
    font-family: 'Readex Pro', sans-serif;
    
`

export const ParentCategory = styled(Category)`
    background-color: ${({ theme }) => theme.color.gray.normal};
    font-weight: 600;  
    font-size: ${({ theme }) => theme.size.normal}px;
    border-top-left-radius: ${({ theme }) => theme.size.small}px;
    border-top-right-radius: ${({ theme }) => theme.size.small}px;
    padding-top: 10px;
    padding-bottom: 10px; 
`
export const CategoryItem = styled(Category)`
    background-color: ${({ theme }) => theme.color.gray.light};
    font-weight: 400;
    &:last-child {
        border-bottom-left-radius: ${({ theme }) => theme.size.small}px;
        border-bottom-right-radius: ${({ theme }) => theme.size.small}px;
    }
`

export const Wrapper = styled.div`
    margin-top:${({ theme }) => theme.spacing.sm}px;
`
export const CategoryAmount = styled.span`
    font-weight: 700;
    color: ${({ theme, negative }) => negative ? theme.color.red.normal : theme.color.green.normal}
`
