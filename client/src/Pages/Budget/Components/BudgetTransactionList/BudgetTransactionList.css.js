import styled from 'styled-components';

export const List = styled.ul`
margin-top: ${({ theme }) => theme.spacing.xs * 1.4}px;
    > li + li {
        
        border-top: 3px solid ${({ theme }) => theme.color.pink.normal};
    }

    li {
        margin: 0;
    }
`

export const ListItem = styled.li`
    border-bottom: 1px solid ${({ theme }) => theme.color.gray.dark};
    padding: ${({ theme }) => theme.spacing.xs}px;
    display: flex;
    justify-content: space-between;

    > *:nth-child(1) {
        flex: 4;
    }
    > *:nth-child(2) {
        flex: 2;
    }
    > *:nth-child(3) {
        flex: 2;
    }
    > *:nth-child(4) {
        flex: 2;
    }
`