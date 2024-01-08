import React, { useState, useEffect } from "react";
import {Modal} from "antd";
import { useLocation, useParams, useNavigate, NavLink, Link } from "react-router-dom";

import { Dropdown } from "antd";
import axios from "axios";

import { DASHBOARD } from "../routes/routes";
import { useAuth } from "../context/AuthContext";

import { API_END_POINT } from "../../config";

const Sidebar = ({ menuList }) => {
  const navigate = useNavigate();
  const { id: batchId } = useParams();
  const { token, user } = useAuth();

  const currentPath = useLocation().pathname;
  const isDashboardPage = currentPath.includes(DASHBOARD);

  const [active, setActive] = useState(null);
  const [showSwitchBatch, setShowSwitchBatch] = useState(false);
  const [batchList, setBatchList] = useState([]);
  const [currentBatch,setCurrentBatch] = useState(null)
  


  const headers = {
    Authorization: `Bearer ${token.access}`,
    "Content-type": "application/json",
  };
  useEffect(() => {

    if (batchId) {
      // On Batch, setting Applications as default page
      
      const activeMenuItem = menuList.find((menu) => currentPath.includes(menu.id));
      setActive(activeMenuItem.id)
  
      axios
        .get(`${API_END_POINT}/api/list/batch/`, { headers })
        .then((res) => {
          const batchListData = res.data.data
          setBatchList(batchListData.filter((batch)=>batch.id !== Number(batchId)));
          setCurrentBatch(batchListData.find((batch) => batch.id === Number(batchId)));
        })
        .catch((err) => console.log(err));
    }

  }, [batchId]);



  const handleLogout = () => {
    axios
      .post(`${API_END_POINT}/api/accounts/logout/`, token, { headers })
      .then((res) => {
        navigate("/login");
        console.log(res);
      });
  };
  const items = [
    {
      label: (
        <button className="btn primary-medium" onClick={handleLogout}>
          Logout
        </button>
      ),
      key: "0",
    },
  ];


  const handleSwitch = (id, batchName) => {
    Modal.confirm({
      width: 400,
      title: `Confirm Switch to ${batchName}`,
      content: "Are you sure you want to Switch this Batch?",
      okText: "Switch",
      onOk: () => {
        navigate(`/batch/${id}/applications`);
        window.location.reload();
      },
      closable: true,
      cancelButtonProps: { style: { display: "none" } },
    });
  };

  return (
    <>
      <nav className="side-nav-container flex">
        <Link to="/dashboard" >
          <div className="logo"  style={{cursor:"pointer"}}>
            <img src="/images/dckap_palli_logo_sm.svg" alt="DCKAP Palli logo" />
          </div>
        </Link>
        {!isDashboardPage && (
          <div
            className="batch-switch-container flex"
            onClick={() => setShowSwitchBatch(!showSwitchBatch)}
          >
            <div className="batch-content-container flex">
              <div className="batch-logo">
                <p>B</p>
              </div>
              <div className="batch-name">
                <p>{currentBatch?.batch_name}</p>
                {/* // CHange to currentBatch year */}

                <span>2023-2024</span>
              </div>
            </div>
            <div className="switch-icon">
              <img src="/icons/dropdown.svg" alt="" />
            </div>
          </div>
        )}

        <div className="nav-links">
          <ul>
            {!isDashboardPage && (
              <li className={`main-link`}>
                <a href={"/dashboard"} className="flex">
                  <img src="/icons/backIcon.svg" alt={"Back to Dashboard"} />
                  <span>{"Back to Dashboard"}</span>
                </a>
              </li>
            )}
            {menuList &&
              menuList.map((menu, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => setActive(menu.id)}
                    className={`main-link ${
                      menu.id === active ? "main-active" : ""
                    }`}
                  >
                    <a
                      href={
                        isDashboardPage
                          ? "/dashboard"
                          : `/batch/${batchId}/${menu.id}`
                      }
                      className="flex"
                    >
                      <img
                        src="/public/icons/application.svg"
                        alt={menu.label}
                      />
                      <span>{menu.label}</span>
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>

        <div className="user-profile flex">
          <div className="profile-img">
            <img src="/icons/profile.svg" alt="" />
          </div>

          <Dropdown
            menu={{
              items,
            }}
          >
            <div className="user-details">
              <p>{user.last_name}</p>
              <span>Admin</span>
            </div>
          </Dropdown>
        </div>
      </nav>

      {showSwitchBatch && (
        <div className="popup-container">
          <div className="popup-content">
            <div className="inner-content flex">
              <h3>Switch Batch</h3>
              <div className="close-icon">
                <img
                  src="/public/icons/Cancel.svg"
                  className="cancel-btn"
                  alt=""
                  onClick={() => setShowSwitchBatch(false)}
                />
              </div>
            </div>
            <div className="add-batch">
              {/* <button className="add-batch-btn">
                <span>+</span> Add New Batch
              </button> */}
            </div>
          </div>
          <div className="switch-batch-list-container">
            {batchList.map((batch, index) => {
              return (
                <div className="switch-batch-card flex" 
                onClick={() => handleSwitch(batch.id, batch.batch_name)}
                key={index}>
                  <div className="batch-left-side flex">
                    <div className="batch-name-year">
                      <h4>{batch.batch_name}</h4>
                      <p>
                        {batch.start_date.slice(0, 4)} -{" "}
                        {batch.end_date.slice(0, 4)}{" "}
                      </p>
                    </div>
                    <div className="tag">
                      <span>Internship</span>
                    </div>
                  </div>
                  {/* <div className="batch-right-side">
                    <img src="/public/icons/edit-pencil.svg" alt="" />
                  </div> */}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
