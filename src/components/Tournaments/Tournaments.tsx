import React from 'react';
import { debounce } from 'lodash';
import { connect } from 'react-redux';
import { ITournament, ReactEvent } from '../../interfaces/interfaces';
import TournamentsList from '../TournamentsList/TournamentsList';
import {
  fetchAllTournaments,
  createTournament,
  searchTournament,
  deleteTournament,
  editTournament,
} from '../../actions/tournaments';
import {
  tournamentListSelector,
  loadingTournamentSelector,
  errorTournamentSelector,
} from '../../selectors/tournaments';
import { RootState } from '../../reducers';
import { Container, Group, StyledError } from './Tournaments.styles';
import H6 from '../H6';
import SearchInput from '../SearchInput/SearchInput';
import Button from '../Button/Button';

interface ITournamentsProps {
  fetchAllTournaments: () => void;
  createTournament: (name: string) => void;
  searchTournament: (query: string) => void;
  deleteTournament: (name: string) => void;
  editTournament: (id: string, name: string) => void;
  loading: Boolean;
  error: null | string;
  tournaments: ITournament[] | null;
}

const Tournaments = ({
  fetchAllTournaments,
  createTournament,
  searchTournament,
  editTournament,
  deleteTournament,
  loading,
  error,
  tournaments,
}: ITournamentsProps) => {
  const [searchInput, setSearchInput] = React.useState('');

  const debouncedSearchTournament = React.useMemo(
    () => debounce((query: string) => searchTournament(query), 500),
    [searchTournament]
  );

  const onChangeHandler = (e: ReactEvent) => {
    setSearchInput(e.target.value);

    debouncedSearchTournament(e.target.value);
  };

  const onCreateTournament = () => {
    const name: string | null = prompt('Tournament Name');

    if (!name) return;

    createTournament(name);
  };

  React.useEffect(() => {
    fetchAllTournaments();
  }, [fetchAllTournaments]);

  let render = <H6>No tournaments found.</H6>;

  render = error ? (
    <StyledError>
      <H6>Something Went Wrong...</H6>
      <Button onClick={fetchAllTournaments}>RETRY</Button>
    </StyledError>
  ) : (
    render
  );

  render = loading ? <H6>Loading tournaments...</H6> : loading;

  render = tournaments?.length ? (
    <TournamentsList
      tournaments={tournaments}
      onDelete={deleteTournament}
      onEdit={editTournament}
    />
  ) : (
    render
  );

  return (
    <Container>
      <Group>
        <SearchInput
          value={searchInput}
          onChange={onChangeHandler}
          placeholder="Search tournaments..."
        />
        <Button onClick={onCreateTournament}>Create Tournament</Button>
      </Group>
      {render}
    </Container>
  );
};

const stateProps = (state: RootState) => ({
  tournaments: tournamentListSelector(state),
  loading: loadingTournamentSelector(state),
  error: errorTournamentSelector(state),
});

const dispatchProps = {
  fetchAllTournaments,
  createTournament,
  searchTournament,
  deleteTournament,
  editTournament,
};

export default connect(stateProps, dispatchProps)(Tournaments);
