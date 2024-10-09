import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import NewTaskForm from './components/NewTaskForm/NewTaskForm.js';
import Footer from './components/Footer/Footer.js';
import TaskList from './components/TaskList/TaskList.js';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [],
    filter: 'all'
  };

  createTodoItem(label) {
    return {
      label,
      id: this.maxId++,
      completed: false,
      createdAt: new Date() 
    };
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter(item => item.id !== id);
      return {
        todoData: newArray
      };
    });
  };

  toggleTaskCompletion = (id) => {
    this.setState(({ todoData }) => {
      const newData = todoData.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      );
      return {
        todoData: newData
      };
    });
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const activeTasks = todoData.filter(item => !item.completed);
      return {
        todoData: activeTasks
      };
    });
  };

  setFilter = (filter) => {
    this.setState({ filter });
  };

  filterTasks = (items, filter) => {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter(item => !item.completed);
      case 'completed':
        return items.filter(item => item.completed);
      default:
        return items;
    }
  };

  onToggleLeft = () => {
    const { todoData } = this.state;
    const activeItemsLeft = todoData.filter(item => !item.completed).length;
    return activeItemsLeft;
  };

  render() {
    const { todoData, filter } = this.state;
    const itemsLeft = this.onToggleLeft();
    const visibleItems = this.filterTasks(todoData, filter);

    return (
      <section className="todoapp">
        <section className="main">
          <NewTaskForm onItemAdded={this.addItem} />
          <TaskList
            todos={visibleItems}
            onDeleted={this.deleteItem}
            onToggleTaskCompletion={this.toggleTaskCompletion}
          />
          <Footer
            itemsLeft={itemsLeft}
            filter={filter}
            onFilterChange={this.setFilter}
            onClearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);