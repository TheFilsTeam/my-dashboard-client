import { Container, Flex } from "@mantine/core";
import ToDoList from "../components/ToDoList";
import Pomodoro from "../components/Pomodoro";

export default function Home(props) {
  return (
    <Container fluid>
      <h1>Your dashboard</h1>
      <Flex
        mih={50}
        gap="md"
        justify="space-evenly"
        align="flex-start"
        direction="row"
        wrap="wrap"
      >
        <ToDoList />
        <Pomodoro
          minutesLeft={props.minutesLeft}
          setMinutesLeft={props.setMinutesLeft}
          secondsLeft={props.secondsLeft}
          setSecondsLeft={props.setSecondsLeft}
          timerStatus={props.timerStatus}
          setTimerStatus={props.setTimerStatus}
          timerRef={props.timerRef}
        />
      </Flex>
    </Container>
  );
}
