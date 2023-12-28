import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";


import { Skeleton,Modal,notification } from "antd";
import axios from "axios";

import { useAuth } from "../context/AuthContext";

import { API_END_POINT } from "../../config";
import dayjs from "dayjs";

const TaskList = ({
  mode,
  filterShow,
  handleEdit,
  onEditModeChange,
  taskLists,
  setTaskSearchWord,
  loading,
  handleDelete,
  handleAdd,
  selectedTask
}) => {


  const TaskCard = ({ task }) => {
    const truncateText = (text, maxLength) => {
      return text.length > maxLength
        ? text.substring(0, maxLength) + "..."
        : text;
    };
    return (
      <>
        <div className={`task-card ${selectedTask=== task.id ? "active" :""} flex`} key={task.id} id={task.id}>
          {loading ? (
            <Skeleton
              avatar={{ size: "small" }}
              active
              paragraph={{ rows: 1 }}
            />
          ) : (
            <>
              <div className="task-icon flex">
                <span>JS</span>
              </div>

              <div className="task-details">
                <div className="task-name-with-icon flex">
                  <h2>{truncateText(task.task_title,15)}</h2>

                   <>
                   <img
                      src="/icons/edit-pencil.svg"
                      alt="edit-icon"
                      className="edit-icon"
                      id={task.id}
                      onClick={() =>handleEdit(task.id)}
                    />
                      <img
                      src="/icons/deleteIcon.svg"
                      alt="delete-icon"
                      className="delete-icon"
                      id={task.id}
                      onClick={() => handleDelete(task.id)}
                    />
                   </>
                    {/* <img src="/icons/deleteIcon.svg" alt="" onClick={()=>handleDelete(task.id)}/> */}
                </div>
                <p className="task-description">
                  {truncateText(
                    task.task_description.replace(/<[^>]*>/g, ""),
                    50
                  )}
                  {/* { task.task_description} */}
                </p>
                <span className="btn btn-inprogress">Inprogress</span>
                <span className="btn btn-deadline">{dayjs(task.due_date).format("MMM,DD YYYY")}</span>
              </div>
            </>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <section className="listing-container">
        <h1>{mode} list</h1>
        <div className="search-container">
          <input
            type="input"
            placeholder="search..."
            onChange={(e) => setTaskSearchWord(e.target.value)}
          />{" "}
          <img
            src="/icons/searchIcon.svg"
            alt="search-icon"
            className="search-icon"
          />
          {filterShow && (
            <img
              src="/icons/filterIcon.svg"
              alt="filter-icon"
              className="filter-icon"
            />
          )}
        </div>
        <div className="create-container">
          <button className="btn create-btn" onClick={handleAdd}>
            <span>+</span>Create {mode}
          </button>
        </div>
        <div className="task-list-container">
          {taskLists && taskLists.data && taskLists.data.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </section>
    </>
  );
};

export default TaskList;
