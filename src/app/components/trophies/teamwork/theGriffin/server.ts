import { TrophyServer } from '../../types';
import base from './base';

const theGriffin: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const maxKillParticipation = Math.max(
      ...match.info.participants.map(
        (participant) => participant.kills + participant.assists
      )
    );
    return Number(
      participant.assists + participant.kills >= maxKillParticipation
    );
  },
};

export default theGriffin;
