import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

function Task({ id, label, completed, onToggle, onDeleted, createdAt }) {
  return (
    <div className="view">
      <input
        id={`task-${id}`}
        className="toggle"
        type="checkbox"
        checked={completed}
        onChange={onToggle}
      />
      <label htmlFor={`task-${id}`}>
        <span className="description">{label}</span>
        <span className="created">
          created{' '}
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </span>
      </label>
      <button type="button" className="icon icon-edit" aria-label="Edit task" />
      <button
        type="button"
        className="icon icon-destroy"
        onClick={onDeleted}
        aria-label="Delete task"
      />
    </div>
  )
}

Task.defaultProps = {
  completed: false,
  createdAt: new Date(),
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  createdAt: PropTypes.instanceOf(Date),
}

export default Task
