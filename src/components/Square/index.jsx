import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

const SquareContainer = styled.div`
    width: 100%;
    height: 60px;
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
            <SquareContainer>
                <h2>Square</h2>
            </SquareContainer>
        );
    }
}

export default Header;