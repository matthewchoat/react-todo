import React, { useState, useEffect } from 'react';
import './Todo.css';
import {Container, Form, Input, Button, Collapse, Card, Fade} from 'reactstrap';

    function Task({ task, index, completeTask, uncompleteTask, removeTask }) {
        const [fadeIn, setFadeIn] = useState(true);
        const toggle = () => setFadeIn(!fadeIn);

        return (
            <Fade in={fadeIn}>
            <div
                className="task"
                style={{ textDecoration: task.completed ? "line-through" : "" }}
            >
                {task.title}
                <Button close style={{ background: "red", padding: "2px"}} onClick={() => removeTask(index)}></Button>
                <Button color="success" style={{padding: "3px"}} onClick={() => { task.completed ? uncompleteTask(index) : completeTask(index)}}>Complete</Button>
            </div>
            </Fade>
        );
    }

    function Todo() {
        Storage.prototype.setObj = function(key, obj) {
            return this.setItem(key, JSON.stringify(obj))
        }
        Storage.prototype.getObj = function(key) {
            return JSON.parse(this.getItem(key))
        }

        const [tasksRemaining, setTasksRemaining] = useState(0);
        const [tasks, setTasks] = useState(
            localStorage.getObj('myTasksInLocalStorage') || [
            {
                title: "Morning Yoga",
                completed: true
            },
            {
                title: "Cold shower",
                completed: true
            },
            {
                title: "100 Pushups",
                completed: false
            }
        ]);

        useEffect(() => {
            localStorage.setObj('myTasksInLocalStorage', tasks);
        }, [tasks]);

        const onChange = event => setTasks(event.target.tasks);

        const [isOpen, setIsOpen] = useState(true);

        const toggle = () => setIsOpen(!isOpen);



        useEffect(() => { 
          setTasksRemaining(tasks.filter(task => !task.completed).length) 
        });

        useEffect(() => {
            document.title = `Tasks: ${tasksRemaining}`;
          });

        const addTask = title => {
            const newTasks = [...tasks, { title, completed: false }];
            setTasks(newTasks);
        };

        const completeTask = index => {
            const newTasks = [...tasks];
            newTasks[index].completed = true;
            setTasks(newTasks);
        };

        const uncompleteTask = index => {
            const newTasks = [...tasks];
            newTasks[index].completed = false;
            setTasks(newTasks);
        };

        const removeTask = index => {
            const newTasks = [...tasks];
            newTasks.splice(index, 1);
            setTasks(newTasks);
        };

        return (

            <Container className="todo-container">
                <h1 className="header">Tasks remaining: ({tasksRemaining}). You got this!</h1>
                
                <Container fluid className="tasks">
                    <Collapse isOpen={isOpen}>
                            <Card body style={{ backgroundColor: 'rgba(247, 247, 247, 0)'}}>
                                    {tasks.map((task, index) => (
                                        <Task
                                        task={task}
                                        index={index}
                                        completeTask={completeTask}
                                        uncompleteTask={uncompleteTask}
                                        removeTask={removeTask}
                                        key={index}
                                        onChange={onChange}
                                        />
                                        ))}
                            </Card>
                    </Collapse>
                </Container>
                <Button className="hide" color="secondary" size="sm" onClick={toggle} style={{ margin: '.5rem' }}>Hide</Button>
                <Button className="hide" color="danger" size="sm"  onChange={onChange} onClick={() => (setTasks([]))}>Reset</Button>
                <div className="create-task" >
                    <CreateTask  onChange={onChange} addTask={addTask} />
                </div>
            </Container>
        );
    }

    function CreateTask({ addTask }) {
        const [value, setValue] = useState("");
        const handleSubmit = e => {
            e.preventDefault();
            if (!value) return;

            addTask(value);
            setValue('');
        }
        return (
            <Form onSubmit={handleSubmit}><Input
                type="text"
                className="input"
                name="input"
                id="input"
                value={value}
                placeholder="Type a new task and press [Enter]"
                onChange={e => setValue(e.target.value)}
                  />
            </Form>
        );
    }

    export default Todo;