import React from "react";

import dayjs from "dayjs";

import { useAuth } from "../../context/AuthContext";

import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import {toolbarConfig, validateComments,getPermission } from "../../utils/validate";

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
                          <div className="profile-image flex">{comment.commentor_details?.first_name[0]?.toUpperCase()}{comment.commentor_details?.last_name[0]?.toUpperCase()}</div>

                          <div className="user-detail flex">
                            <div className="name">
                              {comment.commentor_details.first_name} 
                              <span>(
                              {comment.commentor_details.role})</span>
                              <div className="comment-date">
                                {dayjs.utc(comment?.created_at).format("MMM DD YYYY hh:mm a")}
                              </div>
                            </div>
                            <div className="icons">

                              {getPermission(user.permissions, "TaskComments", "delete") && (
                                <>
                                  {comment?.commentor_details?.role == role &&

                                    <>
                                      <img
                                        src="/icons/deleteIcon.svg"
                                        alt="delete-icon"
                                        onMouseOver={(e)=>{
                                          e.target.src ="/icons/delete-icon-hover.svg"
                                        }}
                                        onMouseOut={(e)=>{
                                          e.target.src ="/icons/deleteIcon.svg"
                                        }}
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
                            <ReactQuill
                              theme="snow"
                              modules={toolbarConfig}
                              value={commentText}
                              onChange={(value) => setCommentText(value)}
                              onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                  // Call your function here
                                  handleSaveComment();
                                }
                              }}
                              placeholder="Comment here..."
                            />
                            <div className="cancel_save_btns">
                            <button className="btn-small secondary-medium" onClick={handleCancelEdit}>Cancel</button> 
                            <button className="btn-small primary-medium"  onClick={handleSaveComment}>Save</button>
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
                <p>No comments here...</p>
              </div>
            </>
          )}

        </div>
      </div>
      {getPermission(user.permissions, "TaskComments", "create") && (
       <div className="overall_input_send">
         <div className="Input-send">
          <div className="input-wrapper">
            <div className="send"  onClick={() => validateComments(commentText, "Comments", setCommentsErrors) && handleSendComment(commenterId)}>
              <img
                src="/icons/Send.svg"
                alt="Send-icon"
               
              />
            </div>
          </div>

            <ReactQuill
              placeholder="Comment here..."
              theme="snow"
              modules={toolbarConfig}
              value={isCommentEditId ? "" : commentText}
              onChange={(value) => {
                if (commentErrors["Comments"]) {
                  delete commentErrors["Comments"];
                }
                setCommentText(value);
              }}
              
            />

          <p className="error-message">{commentErrors["Comments"] ? commentErrors["Comments"] : ""}</p>
        </div>
       </div>
      )}

    </>
  );
};

export default Comments;
