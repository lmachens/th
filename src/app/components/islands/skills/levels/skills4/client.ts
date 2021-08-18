import { LevelClient } from '../../../../levels/types';
import base from './base';
import { SkillsIcon, SkillsMarker } from '../../../../levels/skills';
import trophies from '../../../../trophies/client';

const skills4: LevelClient = {
  ...base,
  Icon: SkillsIcon,
  Marker: SkillsMarker,
  trophies: [
    trophies.criminal,
    trophies.legendary,
    trophies.lunatic,
    trophies.overfed,
    trophies.thePolice,
    trophies.theSpartan,
  ],
};

export default skills4;
