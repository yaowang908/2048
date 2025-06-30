import React, { Fragment, useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

// import { BLOCKS_IN_ONE_LINE, BG_COLOR, } from '../GameConfig';
import Menus from './Menus';
import BlocksContainer from './BlocksContainer';
import Grid from './Grid';
import EndGame from './EndGameScreen';
import { GameContext } from './GameContext';
import { useSwipeable } from 'react-swipeable';
import { moveEventHandler } from '../lib/functions/moveEventHandler';
import Cookies from 'js-cookie';
import { generator } from '../lib/functions/generator';
import { BlockData } from '../lib/types';

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const Main = styled.div`
  flex: 2 1 0;
  min-width: 400px;
  max-width: 500px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
  box-sizing: content-box;
  position: relative;
`;

const SideHolder = styled.div`
  flex: 1 1 auto;
  display: flex;
`;

const MainContainer = function MainPlayGround() {
  // const { BLOCKS_IN_ONE_LINE, BG_COLOR } = useContext(GameContext);
  const { state, dispatch } = useContext(GameContext);

  const minWidth = 400;
  const [lineHeight, setLineHeight] = useState('0');
  const [gridHeight, setGridHeight] = useState('0');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (!state) return;
    setHeight();
    window.addEventListener('resize', setHeight);
    return () => {
      window.removeEventListener('resize', setHeight);
    };
  }, [state]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  function setHeight() {
    if (!state) return;
    let thisHeight = window.getComputedStyle(
      document.getElementById('mainHolder')
    ).width;
    let numThisHeight = Number(thisHeight.split('px')[0]);
    thisHeight = numThisHeight < minWidth ? minWidth : numThisHeight;
    let gridHeight = thisHeight / state.BLOCKS_IN_ONE_LINE;
    setGridHeight(String(gridHeight));
    setLineHeight(String(thisHeight));
  }

  const [blockWidth, setBlockWidth] = useState(Number(gridHeight));
  useEffect(() => {
    setBlockWidth(Number(gridHeight));
  }, [gridHeight]);

  const [data, setData] = useState<BlockData[]>([]);

  useEffect(() => {
    if (!state) return;
    const dataFromCookie = Cookies.get('data');
    if (dataFromCookie) {
      try {
        const parsedData = JSON.parse(dataFromCookie);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          setData(parsedData);
          return;
        }
      } catch (e) {
        console.error('Error parsing data from cookie', e);
      }
    }

    const initialData = generator([], state.BLOCKS_IN_ONE_LINE);
    if (initialData) {
      setData(initialData);
      Cookies.set('data', JSON.stringify(initialData), { path: '' });
    }
  }, [state?.BLOCKS_IN_ONE_LINE]);

  useEffect(() => {
    if (!state || !dispatch) return;

    if (state.isLevelUpdate) {
      const initialData = generator([], state.BLOCKS_IN_ONE_LINE);
      if (initialData) {
        setData(initialData);
        Cookies.set('data', JSON.stringify(initialData), { path: '' });
      }
      dispatch({ type: 'isLevelUpdate', isLevelUpdate: false });
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      moveEventHandler({ code: e.code }, state, dispatch, data, setData);
    };

    if (!state.isGameOver) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [state, dispatch, data]);

  //touch screen handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (!state || !dispatch) return;
      moveEventHandler({ code: 'ArrowLeft' }, state, dispatch, data, setData);
    },
    onSwipedRight: () => {
      if (!state || !dispatch) return;
      moveEventHandler({ code: 'ArrowRight' }, state, dispatch, data, setData);
    },
    onSwipedUp: () => {
      if (!state || !dispatch) return;
      moveEventHandler({ code: 'ArrowUp' }, state, dispatch, data, setData);
    },
    onSwipedDown: () => {
      if (!state || !dispatch) return;
      moveEventHandler({ code: 'ArrowDown' }, state, dispatch, data, setData);
    },
    // preventDefaultTouchmoveEvent: false,
    trackMouse: true,
  });

  if (!state) return null;

  return (
    <Fragment>
      {isClient && (
        <EndGame
          width={window.innerWidth + 'px'}
          height={window.innerHeight + 'px'}
        ></EndGame>
      )}
      <Container {...swipeHandlers}>
        <SideHolder className={'sideHolder'}></SideHolder>
        <Main
          id={'mainHolder'}
          style={{ height: lineHeight + 'px', backgroundColor: state.BG_COLOR }}
        >
          <BlocksContainer
            blockWidth={Number(blockWidth)}
            data={data}
          ></BlocksContainer>
          <Grid gridHeight={gridHeight + 'px'}></Grid>
          <Menus width={lineHeight + 'px'}></Menus>
        </Main>
        <SideHolder className={'sideHolder'}></SideHolder>
      </Container>
    </Fragment>
  );
};

export default MainContainer;
