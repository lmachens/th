import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';
import skills5 from '../skills5/server';

const skills4: LevelServer = {
  ...base,
  trophies: [
    trophies.criminal,
    trophies.legendary,
    trophies.lunatic,
    trophies.overfed,
    trophies.thePolice,
    trophies.theSpartan,
  ],
  unlocksLevels: [skills5],
};

export default skills4;
