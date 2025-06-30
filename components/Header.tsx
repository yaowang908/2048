import React, { useContext } from 'react';
import { GameContext } from './GameContext';

const Header: React.FC = () => {
    const { state } = useContext(GameContext);

    if (!state) {
        return null;
    }

    return (
        <div style={{ height: state.HEADER_HEIGHT }} className="flex w-full my-[10px]">
            <div className="flex-auto"></div>
            <div className="flex flex-[2_1_0%] min-w-[400px] max-w-[500px]">
                <div style={{ height: state.HEADER_HEIGHT }} className="flex flex-auto flex-col justify-center max-w-1/2 text-left">
                    <div className="grow-2 shrink basis-auto text-left text-5xl font-bold">
                        {state.GAME_NAME}
                    </div>
                    <div className="flex-auto text-left text-[0.8rem]">
                        {state.GAME_DESCRIPTION}
                    </div>
                </div>
                <div style={{ color: state.COLOR_SCHEME[128] }} className="flex-auto">
                    <h1>{state.score}</h1>
                </div>
            </div>
            <div className="flex-auto"></div>
        </div>
    );
}

export default Header;