import styled from "styled-components";

const RootButton = styled.button`
color:  ${({ theme: { color }, primary }) => primary ? color.gray.light : color.pink.normal};
cursor: inherit;
border: none;
background-color: transparent;
cursor: ${props => props.to || props.onClick || props.type === 'submit' ? 'pointer' : 'default'};
font-family: 'Readex Pro', sans-serif;
&:hover {
    opacity: .8;
}
`;

export const InlineButton = styled(RootButton)`
&:hover{
text-decoration: underline;
}
`;

export const RegularButton = styled(RootButton)`
background: ${({ theme: { color }, primary }) => primary ? color.pink.normal : color.gray.light};
margin: ${({ theme }) => `${theme.spacing.xs / 2}px`};
padding: ${({ theme }) => `${theme.spacing.xs}px`};
border: ${({ theme }) => ` 2px solid ${theme.color.pink.normal}`};
border-radius: 7px;
`;