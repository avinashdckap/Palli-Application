import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { Modal, notification, Empty } from "antd";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

import TaskList from "../../components/TaskList";
import TaskView from "../../components/TaskView";

import { useAuth } from "../../context/AuthContext";

import { API_END_POINT } from "../../../config";

const TaskModule = () => {
  const { token } = useAuth();
  const { id: batchId } = useParams();
  const [editId, setEditId] = useState("");
  const [taskLists, setTaskLists] = useState();
  const [taskSearchWord, setTaskSearchWord] = useState("");
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [deleteTask, setDeleteTask] = useState({});
  const headers = {
    Authorization: `Bearer ${token.access}`,
    "Content-type": "application/json",
  };
  useEffect(() => {
    //this useEffect used to fetch task list and will re-run whenever filter or search is updated
    const url = `${API_END_POINT}/api/task/${batchId}/list_task/?limit=10&page=1&filter_task_type=0&search=${taskSearchWord}`;
    axios
      .get(url, { headers })
      .then((res) => {
        if (res.status === 200 && res.data.message === "Success") {
          setTaskLists(res.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${API_END_POINT}/api/applicant/${batchId}/list/students/`, {
        headers,
      })
      .then((res) => {
        if (res.status === 200 && res.data.message === "Success") {
          setStudents(res.data.data);
          setLoading(false);
          setSelectedStudents(res.data.data.map((student) => student.id));

         
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [taskSearchWord]);

 
  // useEffect(() => {
  //   const id = editId;

  //   const taskUserIds = [];

  //   taskLists?.data.forEach((task) => {
  //    if(task.id == id){
  //     const {task_users} = task;
  //      task_users && task_users.map((a)=>{
  //       taskUserIds.push(a.user)
  //      })
  //    }
  //   });

  //   setSelectedStudents(taskUserIds);

  // }, [editId])

  
  const handleConfirmDelete = () => {
    const isDraft = taskLists.data.some(
      (task) => task.id === deleteTask.id && task.draft
    );

    const updatedTasks = {
      ...taskLists,
      data: taskLists.data.filter((task) => task.id !== deleteTask.id),
    };

    if (isDraft) {
      setTaskLists(updatedTasks);
      setEditId(null);
      notification.success({
        message: "Success",
        description: "Task Deleted Successfully",
        duration: 3,
      });
    } else {
      axios
        .delete(
          `${API_END_POINT}/api/task/${batchId}/delete_task/${deleteTask.id}`,
          {
            headers: {
              Authorization: `Bearer ${token.access}`,
            },
          }
        )
        .then((res) => {
          notification.success({
            message: "Success",
            description: "Task Deleted Successfully",
            duration: 3,
          });
          setEditId(null);
          setDeleteTask({});
          setTaskLists(updatedTasks);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleSave = (taskData, draft) => {
    const { Title, Description, Deadline, SubmissionLink } = taskData;
    const formattedDate = Deadline.format("YYYY-MM-DD HH:mm:ss");

    let isTaskExists = false;

    for (const task of taskLists.data) {
      if (task.task_title === Title) {
        isTaskExists = true;
        break;
      }
    }

    if (isTaskExists) {
      notification.error({
        message: "Error",
        description: `Task "${Title}" already exists`,
        duration: 3,
      });
      return;
    }

    const existingTaskIndex = taskLists.data.findIndex(
      (task) => task.draft === draft
    );

    const createTaskPayload = {
      task_title: Title,
      task_description: Description,
      task_type: 0,
      due_date: formattedDate,
    };

    const apiEndpoint = draft
      ? `${API_END_POINT}/api/task/${batchId}/create_task/`
      : `${API_END_POINT}/api/task/${batchId}/update_task/${editId}`;
    const method = draft ? "POST" : "PUT";

    const assignTask = {
      user: selectedStudents,
      task_status: 0,
      submission_link: SubmissionLink,
    };

    axios({
      method: method,
      url: apiEndpoint,
      headers: {
        Authorization: `Bearer ${token.access}`,
        "Content-Type": "application/json",
      },
      data: createTaskPayload,
    }).then((res) => {
      notification.success({
        message: "Success",
        description: draft
          ? `Task Added Successfully`
          : `Task Updated Successfully`,
        duration: 3,
      });
      //this payload used set the local state
      const newTask = {
        id: res.data.data.id,
        task_title: Title,
        task_description: Description,
        task_type: 0,
        due_date: formattedDate,
      };

      if (existingTaskIndex !== -1) {
        // Remove 'draft' key from the task at the found index
        setTaskLists((prevState) => ({
          ...prevState,
          data: prevState.data.map((task, index) =>
            index === existingTaskIndex
              ? (() => {
                  const updatedTask = {
                    ...task,
                    ...newTask,
                  };
                  delete updatedTask.draft;
                  return updatedTask;
                })()
              : task
          ),
        }));
      }
      setEditId(null);
      axios({
        method: "POST",
        url: `${API_END_POINT}/api/task/${batchId}/assign/task/${res.data.data.id}`,
        headers: {
          Authorization: `Bearer ${token.access}`,
          "Content-Type": "application/json",
        },
        data: assignTask,
      }).then((res) => {});
    });

    //once task create or update tasklist state update
  };

  const handleAdd = () => {
    const uniqueId = uuidv4();

    const createTask = {
      id: uniqueId,
      task_title: "Untitled",
      task_description: "",
      due_date: dayjs(),
      draft: true,
    };

    const concatNewTask = {
      ...taskLists,
      data: [createTask, ...taskLists.data],
    };
    setEditId(uniqueId);
    setTaskLists(concatNewTask);
  };

  const modalConfig = {
    title: "Delete Conformation",
    okButtonProps: {
      style: { background: "#49a843", borderColor: "#EAEAEA" },
    },
    onOk: handleConfirmDelete,
    onCancel: () => setDeleteTask({}),
  };
  return (
    <>
      {deleteTask.id && (
        <Modal open={true} {...modalConfig}>
          <p>{`Are you sure you want to delete task ${deleteTask.task_title}?`}</p>
        </Modal>
      )}
      <TaskList
        //this mode used create task or assessment
        mode={"Task"}
        handleEdit={setEditId}
        taskLists={taskLists}
        setTaskSearchWord={setTaskSearchWord}
        loading={loading}
        filterShow={false}
        handleDelete={setDeleteTask}
        handleAdd={handleAdd}
        selectedTask={editId}
        setSelectId={setEditId}
      />

      {editId ? (
        <TaskView
          type={"task"}
          editId={editId}
          currentTask={
            editId ? taskLists?.data.filter((task) => task.id === editId) : {}
          }
          selectedStudents={selectedStudents}
          students={students}
          setSelectedStudents={setSelectedStudents}
          handleSave={handleSave}
        />
      ) : (
        <div className="select-something-container flex">
          <div className="image-container ">
            <img src="/icons/select-something.svg" alt="" />
            <p className="select-something-heading">Select Something</p>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskModule;
