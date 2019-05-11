import React from 'react';
import { connect } from 'react-redux';

import Canvas from '../components/Canvas';
import PlayerList from '../components/PlayerList';
import PlayerListItem from '../components/PlayerListItem';
import PlayerAvatar from '../components/PlayerAvatar';
import Button from '../components/Button';
import Wrapper from '../components/Wrapper';
import GameHeader from '../components/GameHeader';

export const Lobby = props => {

  const goBack = () => {
    props.history.goBack();
  };

  const startGame = () => {
    props.history.push('/game');
  }

  return (
    <Wrapper>
      <Button onClick={goBack}>Go Back</Button>
      <GameHeader>
        <>ROOM NAME</>
        <Button primary onClick={startGame}>Start!</Button>
      </GameHeader>
      <Canvas />
      <Button marginTop onClick={null}>
        Clear Canvas
      </Button>
      <PlayerList>
        <PlayerListItem>
          <PlayerAvatar info={props.beAvatar} />
        </PlayerListItem>
        {/* <PlayerListItem>
          <PlayerAvatar />
        </PlayerListItem>
        <PlayerListItem>
          <PlayerAvatar />
        </PlayerListItem>
        <PlayerListItem>
          <PlayerAvatar />
        </PlayerListItem>
        <PlayerListItem>
          <PlayerAvatar />
        </PlayerListItem> */}
      </PlayerList>
    </Wrapper>
  );
};

const mapStateToProps = state => ({
  userAvatar: state.userAvatar,
  gameKey: state.gameKey,
  beAvatar: state.message,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lobby);
