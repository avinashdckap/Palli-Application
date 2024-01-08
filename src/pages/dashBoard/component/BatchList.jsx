import React from "react";

import { Link } from "react-router-dom";

import { Tooltip } from "antd";

import "../scss/Dashboard.css";
const BatchList = ({ batchesList, handleEditClick }) => {
  return (
    <>
      {batchesList.map((batch, index) => (
        <div className="main-batches batch-card flex" key={index}>
            <div className="added-batches">
          <Link to={`/batch/${batch.id}/applications`} className="link">

              <div className="batches-list">
                {/* <Tooltip placement="top" title={batch.batch_name}>
                  
                </Tooltip> */}
                <h3 className="batch-name">
                    {batch.batch_name.length > 12
                      ? <Tooltip placement="top" title={batch.batch_name}>
                        {`${batch.batch_name.slice(0, 20)}...`}
                      </Tooltip>
                      : batch.batch_name}
                  </h3>
                <div className="years flex">
                  <p className="start_date">{batch.start_date.slice(0, 4)}</p>
                  <p className="start_date">to</p>
                  <p className="end_date">{batch.end_date.slice(0, 4)}</p>
                </div>
              </div>
          </Link>

            </div>
          <span
            onClick={() => handleEditClick(batch)}
            className="material-symbols-outlined edit-icon"
          >
            edit
          </span>
        </div>
      ))}
    </>
  );
};

export default BatchList;
