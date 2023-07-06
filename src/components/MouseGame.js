import { Button, Paper, Title } from "@mantine/core";
import { useEffect, useState } from "react";

export default function MouseGame({playAgain}) {
    useEffect(() => {
        console.log("window", window);
        window.initializeMouseGame();
    }, [])

    return (<Paper maw={600} shadow="md" p="md">
    <Title mb={20} order={1} color='grey' size={15} align='left'>
        🐭 Hurry up 
    </Title>
    <div className="mouse-game">
        <div>
          Difficulty:{" "}
          <select name="difficulty" id="difficulty">
            <option value="">Choose your difficulty...</option>
            <option value={60}>easy</option>
            <option value={20}>medium</option>
            <option value={10}>hard</option>
          </select>
        </div>
        <p id="time" />
        <div id="board">
          {/* border horizontal */}
          <div className="pixel" />
          <div className="border-horizontal wall" />
          <div className="pixel" />
          <div className="border-horizontal wall" />
          <div className="pixel" />
          <div className="border-horizontal wall" />
          <div className="pixel" />
          <div className="border-horizontal wall" />
          <div className="pixel" />
          <div className="border-horizontal wall" />
          <div className="pixel" />
          <div className="border-horizontal wall" />
          <div className="pixel" />
          {/* 1st line */}
          <div className="border-vertical wall" />
          <div id="start" className="cell" />
          <div className="border-vertical" />
          <div className="cell direction" />
          <div className="border-vertical" />
          <div className="cell direction" />
          <div className="border-vertical" />
          <div className="cell direction" />
          <div className="border-vertical" />
          <div className="cell direction" />
          <div className="border-vertical" />
          <div className="cell direction" />
          <div className="border-vertical wall" />
          <div className="pixel" />
          <div className="border-horizontal wall" />
          <div className="pixel" />
          <div className="border-horizontal wall" />
          <div className="pixel" />
          <div className="border-horizontal wall" />
          <div className="pixel" />
          <div className="border-horizontal wall" />
          <div className="pixel" />
          <div className="border-horizontal wall" />
          <div className="pixel" />
          <div className="border-horizontal" />
          <div className="pixel" />
          {/* 2nd line */}
          <div className="border-vertical wall" />
          <div className="cell direction" />
          <div className="border-vertical" />
          <div className="cell direction" />
          <div className="border-vertical" />
          <div className="cell direction" />
          <div className="border-vertical" />
          <div className="cell direction" />
          <div className="border-vertical" />
          <div className="cell direction" />
          <div className="border-vertical wall" />
          <div className="cell direction" />
          <div className="border-vertical wall" />
          <div className="pixel" />
          <div className="border-horizontal" />
          <div className="pixel" />
          <div className="border-horizontal wall" />
          <div className="pixel" />
          <div className="border-horizontal wall" />
          <div className="pixel" />
          <div className="border-horizontal wall" />
          <div className="pixel" />
          <div className="border-horizontal" />
          <div className="pixel" />
          <div className="border-horizontal" />
          <div className="pixel" />
          {/* 3rd line */}
          <div className="border-vertical wall" />
          <div className="cell direction" />
          <div className="border-vertical wall" />
          <div className="cell direction" />
          <div className="border-vertical" />
          <div className="cell direction" />
          <div className="border-vertical" />
          <div className="cell direction" />
          <div className="border-vertical wall" />
          <div className="cell direction" />
          <div className="border-vertical wall" />
          <div className="cell direction" />
          <div className="border-vertical wall" />
          <div className="pixel" />
          <div className="border-horizontal" />
          <div className="pixel" />
          <div className="border-horizontal" />
          <div className="pixel" />
          <div className="border-horizontal wall" />
          <div className="pixel" />
          <div className="border-horizontal" />
          <div className="pixel" />
          <div className="border-horizontal" />
          <div className="pixel" />
          <div className="border-horizontal" />
          <div className="pixel" />
          {/* 4th line */}
          <div className="border-vertical wall" />
          <div className="cell direction" />
          <div className="border-vertical wall" />
          <div className="cell direction" />
          <div className="border-vertical wall" />
          <div id="end" className="cell">
            <img id="cheese-img" src="./cheese.png" alt="cheese" />
          </div>
          <div className="border-vertical" />
          <div className="cell direction" />
          <div className="border-vertical wall" />
          <div className="cell direction" />
          <div className="border-vertical wall" />
          <div className="cell direction" />
          <div className="border-vertical wall" />
          <div className="pixel" />
          <div className="border-horizontal" />
          <div className="pixel" />
          <div className="border-horizontal" />
          <div className="pixel" />
          <div className="border-horizontal wall" />
          <div className="pixel" />
          <div className="border-horizontal wall" />
          <div className="pixel" />
          <div className="border-horizontal" />
          <div className="pixel" />
          <div className="border-horizontal" />
          <div className="pixel" />
          {/* 5th line */}
          <div className="border-vertical wall" />
          <div className="cell direction" />
          <div className="border-vertical wall" />
          <div className="cell direction" />
          <div className="border-vertical" />
          <div className="cell direction" />
          <div className="border-vertical" />
          <div className="cell direction" />
          <div className="border-vertical" />
          <div className="cell direction" />
          <div className="border-vertical wall" />
          <div className="cell direction" />
          <div className="border-vertical wall" />
          <div className="pixel" />
          <div className="border-horizontal" />
          <div className="pixel" />
          <div className="border-horizontal wall" />
          <div className="pixel" />
          <div className="border-horizontal wall" />
          <div className="pixel" />
          <div className="border-horizontal wall" />
          <div className="pixel" />
          <div className="border-horizontal wall" />
          <div className="pixel" />
          <div className="border-horizontal" />
          <div className="pixel" />
          {/* 6th line */}
          <div className="border-vertical wall" />
          <div className="cell direction" />
          <div className="border-vertical" />
          <div className="cell direction" />
          <div className="border-vertical" />
          <div className="cell direction" />
          <div className="border-vertical" />
          <div className="cell direction" />
          <div className="border-vertical" />
          <div className="cell direction" />
          <div className="border-vertical" />
          <div className="cell direction" />
          <div className="border-vertical wall" />
          <div className="pixel" />
          <div className="border-horizontal wall" />
          <div className="pixel" />
          <div className="border-horizontal wall" />
          <div className="pixel" />
          <div className="border-horizontal wall" />
          <div className="pixel" />
          <div className="border-horizontal wall" />
          <div className="pixel" />
          <div className="border-horizontal wall" />
          <div className="pixel" />
          <div className="border-horizontal wall" />
          <div className="pixel" />
          <div id="player">
            <img id="player-img" src="./mouse_right.png" alt="mouse" />
          </div>
        </div>
        {/* <div style="font-size: 50px;"> 
          
          ⬆️➡️⬇️⬅️
          
          </div> */}
	<script src="./easter_egg.js"></script>	
          </div>
            <Button onClick={playAgain}>Play again</Button>
          </Paper>
      );
}