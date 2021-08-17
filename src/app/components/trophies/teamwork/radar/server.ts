import { TrophyServer } from '../../types';
import base from './base';

const radar: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const maxWardsPlaced = Math.max(
      ...match.info.participants.map((participant) => participant.wardsPlaced)
    );
    const maxWardsKilled = Math.max(
      ...match.info.participants.map((participant) => participant.wardsKilled)
    );
    const maxVisionWardsBoughtInGame = Math.max(
      ...match.info.participants.map(
        (participant) => participant.visionWardsBoughtInGame
      )
    );

    return Number(
      participant.wardsPlaced >= maxWardsPlaced &&
        participant.wardsKilled >= maxWardsKilled &&
        participant.visionWardsBoughtInGame >= maxVisionWardsBoughtInGame
    );
  },
};

export default radar;
