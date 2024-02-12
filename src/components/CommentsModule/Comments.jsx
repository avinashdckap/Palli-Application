import React from "react";

import dayjs from "dayjs";

import { useAuth } from "../../context/AuthContext";

import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import { CustomIcons, toolbarConfig, valueTrim,getPermission } from "../../utils/validate";

import "./scss/Comments.css";

const Comments = (props) => {
  const {
    comments,
    commenterId,
    role,
    commentText,
    setCommentText,
    isCommentEditId,
    setIsCommentEditId,
    handleSendComment,
    handleDeleteComment,
    setCommentsErrors,
    commentErrors
  } = props;

  const handleEditComment = (commentId, commentText) => {
    setIsCommentEditId(commentId);
    setCommentText(commentText);
  };
  const handleSaveComment = () => {
    handleSendComment(isCommentEditId);
    setIsCommentEditId(null);
    setCommentText("");
  }
  const handleCancelEdit = () => {
    setIsCommentEditId(null);
    setCommentText("");
  };
  const { user } = useAuth()

  return (
    <>

      <div className="comments-list-container">
        <div>
          {comments?.length > 0 ? (
            <>
              {comments &&
                comments?.map((comment, index) => {
                  return (
                    <>
                      <div className="comments-main-container" key={index}>
                        <div className="comments-section flex">
                          <div className="profile-image flex">GG</div>

                          <div className="user-detail flex">
                            <div className="name">
                              {comment.commentor_details.first_name} (
                              {comment.commentor_details.role})
                              <div className="comment-date">
                                {dayjs().format("MMMM DD YYYY h:mm A")}
                              </div>
                            </div>
                            <div className="icons">

                              {getPermission(user.permissions, "TaskComments", "delete") && (
                                <>
                                  {comment?.commentor_details?.role == role &&

                                    <>
                                      <img
                                        src="/icons/deleteIcon.svg"
                                        alt=""
                                        onClick={() => handleDeleteComment(comment.id)}
                                      />
                                    </>}
                                </>

                              )}

                            </div>
                          </div>
                        </div>

                        {isCommentEditId === comment.id ? (
                          <div className="edit-comment">
                            <CustomIcons />
                            <ReactQuill
                              theme="snow"
                              modules={toolbarConfig}
                              value={commentText}
                              onChange={(value) => setCommentText(value)}
                            />
                            <div className="cancel_save_btns">
                            <button className="btn secondary-medium" onClick={handleCancelEdit}>Cancel</button> 
                            <button className="btn primary-medium"  onClick={handleSaveComment}>Save</button>
                            </div>
                            
                          </div>
                        ) : (
                          <div
                            className="comments"
                            dangerouslySetInnerHTML={{ __html: comment.comments }}
                            onDoubleClick={() => {
                              if (
                                comment?.commentor_details?.role === role &&
                                getPermission(user.permissions, "TaskComments", "update")
                              ) {
                                handleEditComment(comment.id, comment.comments);
                              }
                            }}
                          ></div>
                        )}
                      </div>
                    </>
                  );
                })}
            </>
          ) : (
            <>
              <div className="no-comments-container">
                <img src="/icons/no-data.svg" alt="" />
                {/* Ganesh change inline style to scss */}
                <p style={{ textAlign: "center" }}>No comments here...</p>
              </div>
            </>
          )}

        </div>
      </div>
      {getPermission(user.permissions, "TaskComments", "create") && (
       <div className="overall_input_send">
         <div className="Input-send">
          <div className="input-wrapper">
            <div className="send"  onClick={() => valueTrim(commentText, "comments", setCommentsErrors) && handleSendComment(commenterId)}>
              <img
                src="/icons/Send.svg"
                alt="Send-icon"
               
              />
            </div>
          </div>

          <CustomIcons />
          <ReactQuill theme="snow" modules={toolbarConfig} value={commentText} onChange={(value) => {
            if (commentErrors["comments"]) {
              delete commentErrors["comments"]
            }
            setCommentText(value)
          }} />
          <p className="error-message">{commentErrors["comments"] ? commentErrors["comments"] : ""}</p>
        </div>
       </div>
      )}

    </>
  );
};

export default Comments;
