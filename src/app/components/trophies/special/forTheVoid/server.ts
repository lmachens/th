import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const CHOGATH_ID = 31;
const KAISA_ID = 145;
const KASSADIN_ID = 38;
const KHAZIX_ID = 121;
const KOGMAW_ID = 96;
const MALZAHAR_ID = 90;
const REKSAI_ID = 421;
const VELKOZ_ID = 161;

const voidChampionIds = [
  CHOGATH_ID,
  KAISA_ID,
  KASSADIN_ID,
  KHAZIX_ID,
  KOGMAW_ID,
  MALZAHAR_ID,
  REKSAI_ID,
  VELKOZ_ID,
];

const forTheVoid: TrophyServer = {
  ...base,
  checkProgress: ({ participant, account }) => {
    const trophyProgress = getTrophyProgress(account, 'forTheVoid');
    if (!voidChampionIds.includes(participant.championId) || !participant.win) {
      return trophyProgress;
    }
    return 1 / 3 + trophyProgress;
  },
};

export default forTheVoid;
