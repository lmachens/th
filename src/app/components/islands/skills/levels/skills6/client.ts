import { LevelClient } from '../../../../levels/types';
import base from './base';
import { SkillsIcon, SkillsMarker } from '../../../../levels/skills';
import trophies from '../../../../trophies/client';

const skills6: LevelClient = {
  ...base,
  Icon: SkillsIcon,
  Marker: SkillsMarker,
  trophies: [
    trophies.bountyKing,
    trophies.leagueOfDraven,
    trophies.tarzan,
    trophies.theBee,
    trophies.theGoblin,
    trophies.theTiger,
  ],
};

export default skills6;
