import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Skeleton, Modal, notification } from "antd";
import axios from "axios";

import { useAuth } from "../context/AuthContext";

import { API_END_POINT } from "../../config";
import dayjs from "dayjs";



const TaskCard = ({
  loading,
  assessment,
  selectedAssessment,
  handleEdit,
  handleDelete,
}) => {
  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };
  return (
    <>
      <div
        className={`task-card ${
            assessment.id  === selectedAssessment? "active" : ""
        } flex`}
        key={assessment.id}
        id={assessment.id}
      >
        {loading ? (
          <Skeleton avatar={{ size: "small" }} active paragraph={{ rows: 1 }} />
        ) : (
          <>
            <div className="task-icon flex">
              <span>JS</span>
            </div>

            <div className="task-details">
              <div className="task-name-with-icon flex">
                <h2>{truncateText(assessment.task_title, 15)}</h2>

                <>
                  <img
                    src="/icons/deleteIcon.svg"
                    alt="delete-icon"
                    className="delete-icon"
                    id={assessment.id}
                    onClick={(e) => {
                      handleDelete(true)
                      e.stopPropagation();
                    }}
                  />

                  <img
                    src="/icons/edit-pencil.svg"
                    className="edit-icon"
                    alt="edit-icon"
                    onClick={() => {
                      handleEdit(assessment.id);
                    }}
                  />
                </>
              </div>
              <p className="task-description">
                {truncateText(
                  assessment.task_description.replace(/<[^>]*>/g, ""),
                  50
                )}
              </p>
              <span className="btn btn-inprogress">Inprogress</span>
              <span className="btn btn-deadline">
                {dayjs(assessment.due_date).format("MMM,DD YYYY")}
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const AssessmentList = ({
  mode,
  filterShow,
  handleEdit,
  assessmentList,
  setAssessmentSearchWord,
  loading,
  handleDelete,
  handleAdd,
  selectedAssessment,
}) => {


  return (
    <>
      <section className="listing-container">
        <h1>{mode} list</h1>
        <div className="search-container">
          <input
            type="input"
            placeholder="search..."
            onChange={(e) => setAssessmentSearchWord(e.target.value)}
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
          {assessmentList &&
            assessmentList.map((assessment) => (
              <TaskCard
                key={assessment.id}
                loading = {loading}
                assessment={assessment}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                selectedAssessment = {selectedAssessment}
              />
            ))}
        </div>
      </section>
    </>
  );
};

export default AssessmentList;
