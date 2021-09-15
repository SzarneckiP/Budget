import styled from 'styled-components';
import Wrapper from '../Wrapper/Wrapper';


export const Container = styled.div`
background-color: ${({ theme }) => theme.color.gray.light};
display: flex;
padding: ${({ theme }) => theme.spacing.sm}px 0;
justify-content: space-between;
`;

export const List = styled.ul`
display: flex;
`;

export const NavigationWrapper = styled(Wrapper)`
display: flex;
justify-content: space-between;
`;