import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgressDetails } from '../../../../lib/accounts/helpers';

const oneTrickPony: TrophyServer = {
  ...base,
  checkProgress: ({ account, participant }) => {
    if (!participant.win) {
      return {
        progress: 0,
        details: [],
      };
    }
    const trophyProgressDetails = getTrophyProgressDetails(
      account,
      'oneTrickPony'
    );
    const playedSameChampion = [
      ...trophyProgressDetails.filter(
        (championId) => championId === participant.championId
      ),
      participant.championId,
    ];
    return {
      progress: playedSameChampion.length / 5,
      details: playedSameChampion,
    };
  },
};

export default oneTrickPony;
