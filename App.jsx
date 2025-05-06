import React, { useState } from 'react';

// Componente para adicionar novas tarefas
function TaskForm({ addTask }) {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      addTask({ id: Date.now(), text: taskText, completed: false });
      setTaskText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Nova tarefa"
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}

// Componente para cada tarefa
function Task({ task, toggleTaskCompletion, removeTask }) {
  return (
    <div>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTaskCompletion(task.id)}
      />
      <span>{task.text}</span>
      <button onClick={() => removeTask(task.id)}>Remover</button>
    </div>
  );
}

// Componente para exibir a lista de tarefas
function TaskList({ tasks, toggleTaskCompletion, removeTask }) {
  return (
    <div>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          toggleTaskCompletion={toggleTaskCompletion}
          removeTask={removeTask}
        />
      ))}
    </div>
  );
}

// Componente principal da aplicação
function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Calculando o progresso de tarefas concluídas
  const completedTasks = tasks.filter((task) => task.completed).length;
  const progress = (completedTasks / tasks.length) * 100;

  return (
    <div>
      <h1>Todo List</h1>
      <h3>Progresso: {tasks.length > 0 ? progress.toFixed(2) : 0}%</h3>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} toggleTaskCompletion={toggleTaskCompletion} removeTask={removeTask} />
    </div>
  );
}

export default App;

