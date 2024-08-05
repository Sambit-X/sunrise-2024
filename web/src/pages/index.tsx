import Head from "next/head";
import { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Button, List, ListItem, ListItemText, AppBar, Box, Toolbar, styled } from '@mui/material';
import confetti from 'canvas-confetti';

type Task = {
  id: number;
  title: string;
  description: string;
  persona: string;
  group: number;
  completed: boolean;
};

const Badge = styled('span')(({ theme, color }) => ({
  borderRadius: '50%',
  border: 'solid black 1px',
  padding: '3px',
  marginLeft: theme.spacing(1),
  fontSize: '12px',
  backgroundColor: color,
  color: '#fff',
}));

export default function Home() {
  const [todoTasks, setTodoTasks] = useState<Task[]>([]);
  const [inprogressTasks, setInprogressTasks] = useState<Task[]>([]);
  const [finishedTasks, setFinishedTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    // Check if all task lists except completedTasks are empty
    if (todoTasks.length === 0 && inprogressTasks.length === 0 && finishedTasks.length != 0) {
      // Trigger confetti effect
      confetti({
        angle: 125,
        spread: 360,
        particleCount: 500
      });
    }
  }, [todoTasks, inprogressTasks,finishedTasks]);

  const fetchTasks = async () => {
    const res = await fetch('/api/initializeTasks');
    const tasks = await res.json();

    setTodoTasks(tasks.todoTasks)
    setInprogressTasks(tasks.inprogressTasks)
    setFinishedTasks(tasks.finishedTasks)

  }

  const completeTask = async (task: Task) => {
    const res = await fetch('/api/completeTask', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });

    const tasks = await res.json();

    setTodoTasks(tasks.todoTasks)
    setInprogressTasks(tasks.inprogressTasks)
    setFinishedTasks(tasks.finishedTasks)
  }

  const getLowestGroupNumber = (): number => {
    if (inprogressTasks.length === 0) return -1;
    return Math.min(...inprogressTasks.map(task => task.group));
  };

  return (
    <>
      <Head>
        <title>Task Management</title>
        <meta name="description" content="A TODO App :)" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container style={{ maxWidth: '90%' }}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                Task Board
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={4}>
            <Paper style={{ padding: 16 }}>
              <Typography variant="h6">To-Do <Badge color="red">{todoTasks.length}</Badge></Typography>
              <Grid container spacing={2}>
                {todoTasks.map(task => (
                  <Grid item xs={12} sm={6} key={task.id}>
                    <List>
                      <ListItem>
                        <ListItemText
                          primary={task.id + ") " + task.title}
                          secondary={task.description}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          disabled
                        >
                          Done
                        </Button>
                      </ListItem>
                    </List>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <Paper style={{ padding: 16 }}>
              <Typography variant="h6">In Progress <Badge color="purple">{inprogressTasks.length}</Badge></Typography>
              <Grid container spacing={2}>
                {inprogressTasks.map(task => (
                  <Grid item xs={12} sm={6} key={task.id} >
                    <List>
                      <ListItem>
                        <ListItemText
                          primary={task.id + ") " + task.title}
                          secondary={task.description}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          disabled={task.group === getLowestGroupNumber() ? false : true}
                          onClick={() => completeTask(task)}
                        >
                          Done
                        </Button>
                      </ListItem>
                    </List>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <Paper style={{ padding: 16 }}>
              <Typography variant="h6">Finished <Badge color="green">{finishedTasks.length}</Badge></Typography>
              <Grid container spacing={2}>
                {finishedTasks.map(task => (
                  <Grid item xs={12} sm={6} key={task.id}  >
                    <List>
                      <ListItem>
                        <ListItemText
                          primary={task.id + ") " + task.title}
                          secondary={task.description}
                        />
                      </ListItem>
                    </List>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>

      </Container>
    </>
  );
}
