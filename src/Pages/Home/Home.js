import React from 'react';
import { Description, Image, Button, Wrapper, H1, H2 } from './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <div>
            <Image>
                <Description>
                    <H1>Do you have problem with your home budget?</H1>
                    <H2>We will help you organize your spending!</H2>
                </Description>
                <Wrapper>
                    <Link to='/budget'>
                        <Button>TRY IT!</Button>
                    </Link>
                </Wrapper>
            </Image>
        </div>
    );
};

export default Home;