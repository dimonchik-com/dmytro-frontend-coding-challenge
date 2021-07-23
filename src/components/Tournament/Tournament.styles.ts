import theme from '../../theme';
import styled from 'styled-components';

export const TournamentCard = styled.div`
  background-color: ${theme.palette.background.alt1};
  padding: ${theme.spacing(4)};
  border-radius: 4px;
  p {
    margin: 0px 0 ${theme.spacing(1)} 0;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 10px 0 0 0;

  & > :first-child {
    margin-right: ${theme.spacing(2)};
  }
`;
