import { TrophyServer } from '../../types';
import base from './base';

const disruptor: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const maxtotalTimeCCDealt = Math.max(
      ...match.info.participants.map(
        (participant) => participant.totalTimeCCDealt
      )
    );

    return Number(participant.totalTimeCCDealt >= maxtotalTimeCCDealt);
  },
};

export default disruptor;
