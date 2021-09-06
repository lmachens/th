import { TrophyClient } from '../../types';
import base, { REQUIRED_DRAGONS } from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const dragonHunter: TrophyClient = {
  ...base,
  checkLive: ({ events, allPlayers, account }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const teamNames = allPlayers
      .filter((player) => player.team === accountPlayer.team)
      .map((player) => player.summonerName);

    const dragonKills = events.filter(
      (event) =>
        event.EventName === 'DragonKill' && teamNames.includes(event.KillerName)
    ).length;

    const trophyProgress = getTrophyProgress(account, 'dragonHunter');
    return dragonKills / REQUIRED_DRAGONS + trophyProgress;
  },
};

export default dragonHunter;
