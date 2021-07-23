import { RootState } from '../reducers';
import { createSelector } from 'reselect';
import { ITournamentState } from '../interfaces/interfaces';

const rootTournamentSelector = (state: RootState) => state.tournaments;

export const tournamentListSelector = createSelector(
  rootTournamentSelector,
  (state: ITournamentState) => state.tournaments
);
export const loadingTournamentSelector = createSelector(
  rootTournamentSelector,
  (state: ITournamentState) => state.loading
);
export const errorTournamentSelector = createSelector(
  rootTournamentSelector,
  (state: ITournamentState) => state.error
);
