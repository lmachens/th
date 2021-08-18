import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';
import { skills1 } from '../../../skills/levels/server';

const hubSkills: LevelServer = {
  ...base,
  trophies: [
    trophies.careful,
    trophies.farmer,
    trophies.wanted,
    trophies.warrior,
  ],
  unlocksLevels: [skills1],
};

export default hubSkills;
