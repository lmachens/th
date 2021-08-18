import { LevelClient } from '../../../../levels/types';
import base from './base';
import { SkillsIcon, SkillsMarker } from '../../../../levels/skills';
import trophies from '../../../../trophies/client';

const hubSkills: LevelClient = {
  ...base,
  Icon: SkillsIcon,
  Marker: SkillsMarker,
  trophies: [
    trophies.careful,
    trophies.farmer,
    trophies.wanted,
    trophies.warrior,
  ],
};

export default hubSkills;
