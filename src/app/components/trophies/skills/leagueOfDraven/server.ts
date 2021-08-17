import { TrophyServer } from '../../types';
import base from './base';
import { getParticipantKills } from '../../../../lib/riot/helpers';

const leagueOfDraven: TrophyServer = {
  ...base,
  checkProgress: ({ match, events, participant }) => {
    const kills = getParticipantKills(events, participant.participantId);
    const teammates = match.info.participants.filter(
      (other) =>
        other.participantId !== participant.participantId &&
        other.teamId === participant.teamId
    );

    const moreAssistsThanKills = teammates.every((teammate) => {
      const assistsToParticipant = kills.filter((kill) =>
        kill.assistingParticipantIds?.includes(teammate.participantId)
      ).length;
      return teammate.kills <= assistsToParticipant;
    });
    return Number(moreAssistsThanKills);
  },
};

export default leagueOfDraven;
