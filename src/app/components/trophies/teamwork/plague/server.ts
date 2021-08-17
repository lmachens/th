import { TrophyServer } from '../../types';
import base from './base';

const plague: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const maxKillParticipation = Math.max(
      ...match.info.participants.map(
        (participant) => participant.kills + participant.assists
      )
    );
    const maxTotalHeal = Math.max(
      ...match.info.participants.map((participant) => participant.totalHeal)
    );

    return Number(
      participant.kills + participant.assists >= maxKillParticipation &&
        participant.totalHeal >= maxTotalHeal
    );
  },
};

export default plague;
