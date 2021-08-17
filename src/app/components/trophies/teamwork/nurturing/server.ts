import { TrophyServer } from '../../types';
import base from './base';
import {
  getParticipantAssists,
  getTeammates,
  getOtherParticipants,
} from '../../../../lib/riot/helpers';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';

const nurturing: TrophyServer = {
  ...base,
  checkProgress: ({ match, events, participant }) => {
    const assists = getParticipantAssists(events, participant.participantId);

    const teammates = getTeammates(match, participant);
    const maxKills = Math.max(
      ...match.info.participants.map((participant) => participant.kills)
    );

    const fedTeammate = teammates.find((teammate) => {
      const others = getOtherParticipants(match, teammate);
      const maxTotalDamageDealtToChampions = Math.max(
        ...others.map((participant) => participant.totalDamageDealtToChampions)
      );

      return (
        teammate.kills >= maxKills &&
        teammate.totalDamageDealtToChampions >= maxTotalDamageDealtToChampions
      );
    });
    if (!fedTeammate) {
      return 0;
    }

    const timeLimit =
      match.info.queueId === ARAM_HOWLING_ABYSS
        ? 7 * 60 * 1000
        : 10 * 60 * 1000;
    const fedTeamMateAssistsPre10 = assists.filter(
      (assist) =>
        assist.timestamp < timeLimit &&
        assist.killerId === fedTeammate.participantId
    ).length;

    return fedTeamMateAssistsPre10 / 3;
  },
};

export default nurturing;
