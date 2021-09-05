import Modal from './Modal';
import styled from '@emotion/styled';
import FancyButton from '../common/FancyButton';
import { TrophyClient } from '../trophies/types';
import TrophyStats from '../trophies/TrophyStats';
import { useQuery } from 'react-query';
import { getTrophyStats } from '../../lib/stats';
import Percentage from '../common/Percentage';
import Squid from '../icons/Squid';
import { getRecentVersion } from '../../lib/riot';
import { Tooltip } from '../tooltip';
import { MAP_LABELS } from '../../lib/riot/helpers';
import { apiEndoint } from '../../lib/utils/runtime';
import { i18n } from '../../lib/i18n/i18n';

const Container = styled.div`
  display: grid;
  place-items: center;
  align-items: baseline;
  height: 100%;
  grid-template-rows: auto auto 1fr auto;

  p {
    margin: 0.4em 0;
  }
  section {
    text-align: center;
  }
`;

const Text = styled.p`
  text-align: center;
`;

const Stats = styled.p`
  display: grid;
  grid-template-columns: auto auto 4em;
  grid-auto-flow: column;
  gap: 0.7em;
  justify-content: center;
  align-items: center;
  text-align: left;
  img {
    width: 2em;
    height: 2em;
  }

  span {
    height: 100%;
    display: flex;
    align-items: center;
  }
`;

interface TrophyModalProps {
  trophy: TrophyClient;
  onClose(): void;
}

const Title = styled.h3`
  margin: 20px;
  text-transform: uppercase;
`;

const TrophyModal = ({ trophy, onClose }: TrophyModalProps) => {
  const { data: trophyStats, isLoading } = useQuery(
    ['trophyStats', trophy.name],
    () => getTrophyStats(trophy.name)
  );
  const { data: version } = useQuery('version', getRecentVersion);

  const unlockedOrProgress = trophy.maxProgress
    ? i18n('Progress')
    : i18n('Unlocked');
  return (
    <Modal onClose={onClose}>
      <Container>
        <Title>
          {trophy.title} <TrophyStats trophyName={trophy.name} />
        </Title>
        <Text>{trophy.description}</Text>
        <section>
          {isLoading && <p>{i18n('Loading stats...')}</p>}
          {!isLoading && !trophyStats && (
            <>
              <p>{i18n('No stats available')}</p>
              <Squid />
            </>
          )}
          {trophyStats && (
            <>
              <p>
                {unlockedOrProgress} {i18n('in')}{' '}
                <Percentage
                  value={trophyStats.totalCount}
                  max={trophyStats.totalChecks}
                />{' '}
                {i18n('of all matches.')}
              </p>
              <h4>{i18n('Top champions')}</h4>
              {trophyStats.top
                .sort((a, b) => b.count / b.checks - a.count / a.checks)
                .map(({ championId, championName, mapId, count, checks }) => (
                  <Stats key={`${mapId}-${championId}`}>
                    <Tooltip text={MAP_LABELS[mapId]} placement="top">
                      <img
                        src={`https://ddragon.leagueoflegends.com/cdn/${version.riot}/img/map/map${mapId}.png`}
                      />
                    </Tooltip>
                    <Tooltip text={championName} placement="top">
                      <img
                        src={`${apiEndoint}/api/champions/${championId}/img`}
                      />
                    </Tooltip>
                    <Tooltip
                      text={`${unlockedOrProgress} ${i18n(
                        'in'
                      )} ${count} ${i18n('out of')} ${checks} ${i18n(
                        'matches'
                      )}`}
                      placement="top"
                    >
                      <Percentage value={count} max={checks} />
                    </Tooltip>
                  </Stats>
                ))}
            </>
          )}
        </section>
        <FancyButton onClick={onClose}>{i18n('Close')}</FancyButton>
      </Container>
    </Modal>
  );
};

export default TrophyModal;
