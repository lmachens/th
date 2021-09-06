import { i18n } from '../../../../lib/i18n/i18n';
import { TrophyBase } from '../../types';

const dragonLord: TrophyBase = {
  island: 'combat',
  name: 'dragonLord',
  level: 'objectives2',
  title: i18n('Dragon Lord'),
  description: i18n('Kill five dragons (team achievement) in one match.'),
  category: 'objectives',
};

export default dragonLord;
