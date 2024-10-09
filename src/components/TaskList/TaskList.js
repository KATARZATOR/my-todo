import React from "react";
import Task from "../Task/Task";
import PropTypes from 'prop-types';

const TaskList = ({ todos, onDeleted, onToggleTaskCompletion }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <li key={id} className={item.completed ? "completed" : ""}>
        <Task
          {...itemProps}
          completed={item.completed} 
          onToggle={() => onToggleTaskCompletion(id)}
          onDeleted={() => onDeleted(id)}
        />
      </li>
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

TaskList.defaultProps = {
  todos: [],
  onDeleted: () => {},
  onToggleTaskCompletion: () => {}
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func,
  onToggleTaskCompletion: PropTypes.func
};

export default TaskList;