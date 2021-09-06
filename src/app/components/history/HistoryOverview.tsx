import styled from '@emotion/styled';
import * as combatTrophies from '../trophies/combat/client';
import * as epicTrophies from '../trophies/epic/client';
import * as hubTrophies from '../trophies/hub/client';
import * as objectivesTrophies from '../trophies/objectives/client';
import * as skillsTrophies from '../trophies/skills/client';
import * as specialTrophies from '../trophies/special/client';
import * as teamworkTrophies from '../trophies/teamwork/client';
import trophies from '../trophies/client';
import TrophyProgress from './TrophyProgress';
import { useTargetAccount } from '../../contexts/account';
import { i18n } from '../../lib/i18n/i18n';

const progressList = [
  {
    title: i18n('Origin'),
    category: 'hub',
    trophiesMax: Object.keys(hubTrophies).length,
  },
  {
    title: i18n('Combat'),
    category: 'combat',
    trophiesMax: Object.keys(combatTrophies).length,
  },
  {
    title: i18n('Skills'),
    category: 'skills',
    trophiesMax: Object.keys(skillsTrophies).length,
  },
  {
    title: i18n('Teamwork'),
    category: 'teamwork',
    trophiesMax: Object.keys(teamworkTrophies).length,
  },
  {
    title: i18n('Objectives'),
    category: 'objectives',
    trophiesMax: Object.keys(objectivesTrophies).length,
  },
  {
    title: i18n('Epic'),
    category: 'epic',
    trophiesMax: Object.keys(epicTrophies).length,
  },
  {
    title: i18n('Special'),
    category: 'special',
    trophiesMax: Object.keys(specialTrophies).length,
  },
];

const Container = styled.div`
  h3 {
    text-transform: uppercase;
    margin-top: 0;
    font-size: 18px;
  }
`;

const Summary = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 7px;
  row-gap: 5px;
`;

const ProgressContainer = styled.div`
  display: grid;
  grid-template-columns: 18px 1fr auto;
  background: #2b2a30;
  padding: 10px;
  font-size: 16px;
  font-family: 'Roboto Mono', monospace;
  align-items: center;
  column-gap: 10px;

  span {
    color: #77777a;
  }
`;

const IslandTitle = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const HistoryOverview = () => {
  const account = useTargetAccount();

  const completedTrophies =
    account?.trophies.filter((accountTrophy) => accountTrophy.progress === 1) ||
    [];

  return (
    <Container>
      <h3>{i18n('Total trophies unlocked')}</h3>
      <Summary>
        {progressList.map((item) => (
          <ProgressContainer key={item.category}>
            <TrophyProgress category={item.category} progress={100} max={100} />
            <IslandTitle>{item.title}</IslandTitle>
            <div>
              {
                completedTrophies.filter(
                  (accountTrophy) =>
                    trophies[accountTrophy.name].category === item.category
                ).length
              }
              /<span>{item.trophiesMax}</span>
            </div>
          </ProgressContainer>
        ))}
      </Summary>
    </Container>
  );
};

export default HistoryOverview;
