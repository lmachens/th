import { TrophyServer } from '../../types';
import base, { ARAM_MINUTES, SUMMONERS_RIFT_MINUTES } from './base';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';
import { minutesToSeconds } from '../../../../lib/utils/dates';

const theElephant: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const requiredTimelimit =
      match.info.queueId === ARAM_HOWLING_ABYSS
        ? minutesToSeconds(ARAM_MINUTES)
        : minutesToSeconds(SUMMONERS_RIFT_MINUTES);
    if (
      !participant.longestTimeSpentLiving &&
      match.info.gameDuration >= requiredTimelimit * 1000
    ) {
      return 1;
    }
    return participant.longestTimeSpentLiving / requiredTimelimit;
  },
};

export default theElephant;
