import { createContext, Dispatch } from 'react';
import { State, Action } from '../lib/types';

export interface GameContextType {
  state: State;
  dispatch: Dispatch<Action>;
}

export const GameContext = createContext<Partial<GameContextType>>({});