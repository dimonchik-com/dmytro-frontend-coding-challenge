import React from 'react';
import { ITournament } from '../../interfaces/interfaces';
import moment from 'moment';
import { TournamentCard, ButtonGroup } from './Tournament.styles';
import H6 from '../H6';
import Button from '../Button/Button';

interface ITournamentProps {
  tournament: ITournament;
  onEdit: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}

moment.locale('en-GB');

const Tournament = ({ tournament, onDelete, onEdit }: ITournamentProps) => {
  const editTournament = () => {
    const newName = prompt('New Tournament Name');
    if (!newName) return;
    onEdit(tournament.id, newName);
  };

  const deleteTournament = () => {
    if (window.confirm('Do you really want to delete this tournament?')) {
      onDelete(tournament.id);
    }
  };

  return (
    <TournamentCard>
      <H6>{tournament.name}</H6>
      <p>Organizer: {tournament.organizer}</p>
      <p>Game: {tournament.game}</p>
      <p>
        Participants: {tournament.participants.current}/
        {tournament.participants.max}
      </p>
      <p>Start: {moment(tournament.startDate).format('DD/MM/YYYY HH:MM:SS')}</p>
      <ButtonGroup>
        <Button onClick={editTournament}>Edit</Button>
        <Button onClick={deleteTournament}>Delete</Button>
      </ButtonGroup>
    </TournamentCard>
  );
};

export default Tournament;
