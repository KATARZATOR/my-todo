import React from 'react'
import PropTypes from 'prop-types'
import Task from '../Task/Task'

function TaskList({ todos, onDeleted, onToggleTaskCompletion }) {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item

    return (
      <li key={id} className={item.completed ? 'completed' : ''}>
        <Task
          id={id}
          label={itemProps.label}
          completed={itemProps.completed}
          createdAt={itemProps.createdAt}
          onToggle={() => onToggleTaskCompletion(id)}
          onDeleted={() => onDeleted(id)}
        />
      </li>
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

TaskList.defaultProps = {
  todos: [],
  onDeleted: () => {},
  onToggleTaskCompletion: () => {},
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      createdAt: PropTypes.instanceOf(Date).isRequired,
    })
  ),
  onDeleted: PropTypes.func,
  onToggleTaskCompletion: PropTypes.func,
}

export default TaskList
