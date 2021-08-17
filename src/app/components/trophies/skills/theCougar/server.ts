import { TrophyServer } from '../../types';
import base from './base';

const theCougar: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant, timeline }) => {
    if (participant.teamPosition !== 'JUNGLE') {
      return 0;
    }
    const enemyJungler = match.info.participants.find(
      (otherParticipant) =>
        otherParticipant.teamId !== participant.teamId &&
        otherParticipant.lane === participant.lane
    );

    if (!enemyJungler) {
      return 0;
    }
    const frameAt10 = timeline.info.frames[9];
    if (!frameAt10) {
      return 0;
    }

    const goldAt10 =
      frameAt10.participantFrames[participant.participantId].totalGold;
    const goldAt10OtherJungler =
      frameAt10.participantFrames[enemyJungler.participantId].totalGold;

    return goldAt10 / (goldAt10OtherJungler + 1000);
  },
};

export default theCougar;
