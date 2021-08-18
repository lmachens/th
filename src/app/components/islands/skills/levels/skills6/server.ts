import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';

const skills6: LevelServer = {
  ...base,
  trophies: [
    trophies.bountyKing,
    trophies.leagueOfDraven,
    trophies.tarzan,
    trophies.theBee,
    trophies.theGoblin,
    trophies.theTiger,
  ],
  unlocksLevels: [],
};

export default skills6;
