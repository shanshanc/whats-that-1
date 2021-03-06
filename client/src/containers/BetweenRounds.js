import React, { useEffect, useState, useRef } from "react";
import Countdown from "react-countdown-now";

// Redux Imports
import { connect } from "react-redux";

// Component & Container Imports
import DrawingStack from "../components/DrawingStack";
import PlayerAvatar from "../components/PlayerAvatar";
import PolaroidPicBackground from "../components/PolaroidPicBackground";
import TimeRemaining from "../components/TimeRemaining";
import WordToDraw from "../components/WordToDraw";
import Wrapper from "../components/Wrapper";
import styled from "styled-components";
const DrawnImage = styled.img``;

const Author = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
  font-size: 1.5rem;
`;

export const BetweenRounds = ({ history, game, currentUser }) => {
  const [count, setCount] = useState(0);
  const opponents = game.players;
  const countRef = useRef(count);
  countRef.current = count;

  useEffect(() => {
    if (count > 0) {
      if (game) {
        history.push("/game");
      }
      setCount(0);
    }
    setCount(1);
  }, [game.word]);

  const renderer = ({ seconds }) => {
    return <span> {seconds} </span>;
  };

  return (
    <Wrapper inBetween>
      <WordToDraw inBetween>
        <h2 className="gameHeader">{game.word}</h2>
      </WordToDraw>

      <DrawingStack>
        {game.rounds[game.round - 1] !== undefined &&
          game.rounds[game.round - 1].drawings !== undefined &&
          game.rounds[game.round - 1].drawings.map((drawing, i) => (
            <PolaroidPicBackground key={i} delay={i * 2000}>
              <div key={i}>
                <SimpleSvg image={drawing.svg} />
                <Author>
                  <PlayerAvatar info={drawing} size={74} />
                  <span style={{ marginLeft: 10 }}>
                    <b>{drawing.playerName}</b>
                    <br />
                    drew that!
                  </span>
                </Author>
              </div>
            </PolaroidPicBackground>
          ))}
      </DrawingStack>

      <TimeRemaining betweenRounds>
        <p>
          Next round starts in
          <Countdown date={Date.now() + 5000} renderer={renderer} /> seconds
        </p>
      </TimeRemaining>
    </Wrapper>
  );
};

function SimpleSvg(props) {
  const encodedImage = btoa(props.image);
  const imageSrc = `data:image/svg+xml;base64,${encodedImage}`;
  return (
    <DrawnImage src={imageSrc} style={{ width: "100%", height: "100%" }} />
  );
}

const mapStateToProps = state => ({
  game: state.game,
  currentUser: state.currentUser
});

export default connect(mapStateToProps)(BetweenRounds);
