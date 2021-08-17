import { TrophyServer } from '../../types';
import base from './base';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';

const keyTargets: TrophyServer = {
  ...base,
  checkProgress: ({ match, timeline, participant }) => {
    const opponentIds = match.info.participants
      .filter(
        (matchParticipant) => matchParticipant.teamId !== participant.teamId
      )
      .map((opponent) => opponent.participantId);

    const keyTargetKills = timeline.info.frames.reduce(
      (currentKeyTargetKills, frame) => {
        const participantKills = frame.events.filter(
          (event) =>
            event.type === 'CHAMPION_KILL' &&
            event.killerId === participant.participantId
        );
        if (participantKills.length === 0) {
          return currentKeyTargetKills;
        }

        const richesOpponent = Object.values(frame.participantFrames)
          .filter((participantFrame) =>
            opponentIds.includes(participantFrame.participantId)
          )
          .sort((a, b) => b.totalGold - a.totalGold)[0];
        const richesParticipantKills = participantKills.filter(
          (kill) =>
            kill.type === 'CHAMPION_KILL' &&
            kill.victimId === richesOpponent.participantId
        ).length;
        return currentKeyTargetKills + richesParticipantKills;
      },
      0
    );

    const requiredKills = match.info.queueId === ARAM_HOWLING_ABYSS ? 4 : 3;
    return keyTargetKills / requiredKills;
  },
};

export default keyTargets;
