import React from "react";
import { formatDistanceToNow } from 'date-fns'; 
import PropTypes from 'prop-types';

const Task = ({ label, completed, onToggle, onDeleted, createdAt }) => {
  return (
    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        checked={completed}
        onChange={onToggle}
      />
      <label onClick={onToggle}>
        <span className="description">{label}</span>
        <span className="created">
          created {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </span>
      </label>
      <button className="icon icon-edit"></button>
      <button className="icon icon-destroy" onClick={onDeleted}></button>
    </div>
  );
};

Task.defaultProps = {
  completed: false,
  createdAt: new Date(),
};

Task.propTypes = {
  label: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  createdAt: PropTypes.instanceOf(Date)
};

export default Task;