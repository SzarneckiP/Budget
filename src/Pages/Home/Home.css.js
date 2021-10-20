import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    justify-content: start;
    padding-left: ${({ theme }) => theme.spacing.xl * 10}px;
`;

export const Image = styled.div`
    background-image: url(https://images.pexels.com/photos/4475523/pexels-photo-4475523.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1525);
    width: 1525px;
    height: 100vh;
    object-fit: cover;
    margin-left: -29.5%;
    margin-right: auto;
    max-width: 1525px;
`;

export const Description = styled.div`
    font-family: 'Times New Roman', serif;
    display: flex;
    justify-content: start;
    flex-direction: column;
    padding-left: ${({ theme }) => theme.spacing.xl * 5}px;
    padding-top: ${({ theme }) => theme.spacing.xl * 2}px;
`;
export const H1 = styled(Description)`
    font-size: ${({ theme }) => theme.size.high * 0.5}px;
`;
export const H2 = styled(Description)`
    font-size: ${({ theme }) => theme.size.normal}px;
`;


export const Button = styled.button`
    width: ${({ theme }) => theme.size.high * 5}px;
    height: ${({ theme }) => theme.size.medium}px;
    background-color: rgb(219, 112, 147, .5);
    cursor: pointer;
    border-radius: ${({ theme }) => theme.size.small}px;
    border: ${({ theme }) => ` 2px solid ${theme.color.pink.normal}`};
    margin-top: ${({ theme }) => theme.spacing.xl * 6}px;
    font-size: ${({ theme }) => theme.size.normal}px;
    font-family: 'Times New Roman', serif;
    font-weight:  ${({ theme }) => theme.size.high}px;
    &:hover{
        background-color: rgb(219, 112, 147, 1);
    }
`;

