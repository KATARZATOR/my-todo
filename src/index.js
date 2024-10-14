import React, { Component } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import Footer from './components/Footer/Footer'
import TaskList from './components/TaskList/TaskList'

export default class App extends Component {
  static filterTasks(items, filter) {
    switch (filter) {
      case 'all':
        return items
      case 'active':
        return items.filter((item) => !item.completed)
      case 'completed':
        return items.filter((item) => item.completed)
      default:
        return items
    }
  }

  constructor() {
    super()
    this.state = {
      todoData: [],
      filter: 'all',
    }
    this.maxId = 100
  }

  onToggleLeft = () => {
    const { todoData } = this.state
    const activeItemsLeft = todoData.filter((item) => !item.completed).length
    return activeItemsLeft
  }

  setFilter = (filter) => {
    this.setState({ filter })
  }

  clearCompleted = () => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((item) => !item.completed),
    }))
  }

  toggleTaskCompletion = (id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      ),
    }))
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((item) => item.id !== id),
    }))
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text)

    this.setState(({ todoData }) => ({
      todoData: [...todoData, newItem],
    }))
  }

  createTodoItem(label) {
    this.maxId += 1
    return {
      label,
      id: this.maxId,
      completed: false,
      createdAt: new Date(),
    }
  }

  render() {
    const { todoData, filter } = this.state
    const itemsLeft = this.onToggleLeft()
    const visibleItems = App.filterTasks(todoData, filter)

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
    )
  }
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
