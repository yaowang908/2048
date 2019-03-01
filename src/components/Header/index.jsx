import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
    width: 100%;
    height: 100px;
    margin-top: 10vh;
    border-top: 1px solid #fff;
`;

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <HeaderContainer>
                <h1>Score: 10000000</h1>
            </HeaderContainer>
        );
    }
}

export default Header;