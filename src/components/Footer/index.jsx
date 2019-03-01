import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
    width: 100%;
    height: 60px;
    border-top: 1px solid #fff;
`;

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <FooterContainer>
                <button>New Game</button>
                <button>Save Game</button>
            </FooterContainer>
        );
    }
}

export default Footer;