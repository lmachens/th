import { i18n } from '../../../../lib/i18n/i18n';
import { TrophyBase } from '../../types';

const dragonSlayer: TrophyBase = {
  island: 'combat',
  name: 'dragonSlayer',
  level: 'objectives1',
  title: i18n('Dragon Slayer'),
  description: i18n('Kill four dragons (team achievement) in one match.'),
  category: 'objectives',
};

export default dragonSlayer;
