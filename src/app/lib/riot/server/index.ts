import { getRecentVersion } from '../../../../server/version';
import { getAccountsCollection } from '../../accounts/server/collection';
import { getJSON } from '../../utils/request';
import { getTeammates } from '../helpers';
import { Summoner, Match, MatchTimeline, Participant } from '../types';

const requestRiot = async <T>(input: RequestInfo) => {
  return await getJSON<T>(input, {
    headers: {
      'X-Riot-Token': process.env.RIOT_API_KEY,
    },
  });
};

export const getSummoner = async ({ platformId, summonerName }) => {
  try {
    const summoner = await requestRiot<Summoner>(
      `https://${platformId}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURI(
        summonerName
      )}`
    );
    return { platformId, ...summoner };
  } catch (error) {
    console.error(
      `getSummoner ${platformId} ${summonerName} ${error.status} ${error.statusText}`
    );
    return null;
  }
};

const platformIdToRegion = {
  BR1: 'americas',
  EUN1: 'europe',
  EUW1: 'europe',
  JP1: 'asia',
  KR: 'asia',
  LA1: 'americas',
  LA2: 'americas',
  NA1: 'americas',
  OC1: 'americas',
  RU: 'europe',
  TR1: 'europe',
};

export const getMatch = async ({ platformId, matchId }) => {
  try {
    const region = platformIdToRegion[platformId];
    if (!region) {
      throw new Error(`Unknown region for platformId ${platformId}`);
    }
    const match = await requestRiot<Match>(
      `https://${region}.api.riotgames.com/lol/match/v5/matches/${platformId}_${matchId}`
    );
    return match;
  } catch (error) {
    console.error(
      `getMatch ${platformId} ${matchId} ${error.status} ${error.statusText}`
    );
    return null;
  }
};

export const getTimeline = async ({
  platformId,
  matchId,
}: {
  platformId: string;
  matchId: number;
}): Promise<MatchTimeline> => {
  try {
    const region = platformIdToRegion[platformId];
    if (!region) {
      throw new Error(`Unknown region for platformId ${platformId}`);
    }
    const timeline = await requestRiot<MatchTimeline>(
      `https://${region}.api.riotgames.com/lol/match/v5/matches/${platformId}_${matchId}/timeline`
    );
    return timeline;
  } catch (error) {
    console.error(
      `getTimeline ${platformId} ${matchId}  ${error.status} ${error.statusText}`
    );
    return null;
  }
};

export const getMatchAndTimeline = ({
  platformId,
  matchId,
}): Promise<[Match, MatchTimeline]> =>
  Promise.all([
    getMatch({
      platformId,
      matchId,
    }),
    getTimeline({
      platformId,
      matchId,
    }),
  ]);

export const isMatchInProgress = async ({
  platformId,
  encryptedSummonerId,
}: {
  platformId: string;
  encryptedSummonerId: string;
}): Promise<boolean> => {
  try {
    const activeMatch = await requestRiot<Match>(
      `https://${platformId}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${encryptedSummonerId}`
    );
    return !!activeMatch;
  } catch (error) {
    return false;
  }
};

export const getTeammateAccounts = async (
  match: Match,
  participant: Participant
) => {
  const teammates = getTeammates(match, participant);
  const teammateSummonerNames = match.info.participants
    .filter((participant) =>
      teammates.some(
        (teammate) => teammate.participantId === participant.participantId
      )
    )
    .map((participant) => participant.summonerName);

  const Accounts = await getAccountsCollection();
  const teammateAccounts = await Accounts.find({
    'summoner.platformId': match.info.platformId,
    'summoner.name': { $in: teammateSummonerNames },
  }).toArray();
  return teammateAccounts;
};

interface Champion {
  key: string;
  name: string;
  image: {
    full: string;
  };
}
interface ChampionResult {
  type: 'champion';
  format: 'standAloneComplex';
  version: string;
  data: {
    [name: string]: Champion;
  };
}
const cachedChampions = {
  timestamp: 0,
  promise: null,
};
export const getChampions = async () => {
  try {
    if (cachedChampions.timestamp < Date.now() - 1000 * 60 * 60) {
      const version = await getRecentVersion();
      cachedChampions.promise = getJSON<ChampionResult>(
        `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
      );
      cachedChampions.timestamp = Date.now();
    }
    const champions = await cachedChampions.promise;
    return Object.values(champions.data) as Champion[];
  } catch (error) {
    console.error(`getChampions ${error.status} ${error.statusText}`);
    return null;
  }
};
