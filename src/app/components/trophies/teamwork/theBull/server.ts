import { TrophyServer } from '../../types';
import base from './base';
import { getParticipantDeaths } from '../../../../lib/riot/helpers';

const theBull: TrophyServer = {
  ...base,
  checkProgress: ({ participant, events }) => {
    const deaths = getParticipantDeaths(events, participant.participantId);
    const nonBullDeaths = deaths.filter(
      (event) => event.assistingParticipantIds?.length < 2
    ).length;

    return Number(nonBullDeaths === 0);
  },
};

export default theBull;
