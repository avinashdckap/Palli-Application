import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import axios from "axios";
import { Pagination, Popover, Tag, Skeleton, Tooltip, Modal } from "antd";
import dayjs from "dayjs";

import { API_END_POINT } from "../../../config";

import { useAuth } from "../../context/AuthContext";

import FilterComponent from "../../components/FilterComponent";

import useFilter from "../../hooks/useFilter";

import "./scss/css/Applications.css";

const Applications = () => {
  const filterFields = useFilter("applicant");
  const { id: batchId } = useParams();
  const { token } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);

  const [viewMoreApplicant, setViewMoreApplicant] = useState([]);
  const [applications, setApplications] = useState({ data: [] });
  const [applicationSearch, setApplicationSearch] = useState("");
  const [appliedFilterShow, setAppliedFilterShow] = useState({});
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [filterState, setFilterState] = useState({
    district: "",
    annual_income_min: "",
    annual_income_max: "",
    userStatus: "",
    degree: "",
    venue: "",
    pincode: "",
    subject: "",
    mark_min: "",
    mark_max: "",
    user_status: "",
  });


  const headers = {
    Authorization: `Bearer ${token.access}`,
    "Content-type": "application/json",
  };
  useEffect(() => {
    setLoading(true);

    //this useEffect used to fetch application list and will re-run whenever filter or search is updated
    axios
      .get(
        `${API_END_POINT}/api/applicant/${batchId}/list/applicants/?filter_mark_min=${filterState.mark_min}&&filter_mark_max=${filterState.mark_max}&&filter_subject=${filterState.subject}&&filter_annual_income_min=${filterState.annual_income_min}&&filter_annual_income_max=${filterState.annual_income_max}&&filter_degree=${filterState.degree}&&filter_district=${filterState.district}&&filter_pincode=${filterState.pincode}&limit=${limit}&page=${page}&search=${applicationSearch}`,
        { headers }
      )
      .then((res) => {
        setApplications(res.data);
        setLoading(false);
      });
  }, [applicationSearch, limit, page, filterState]);

  const handleApplyFilter = (filterData) => {
    console.log(filterData);
    setAppliedFilterShow(filterData);

    Object.keys(filterData).forEach((key) => {
      setFilterState((prevFilterState) => ({
        ...prevFilterState,
        [key]: filterData[key],
      }));
    });
  };
  const handleRemoveFilter = (fieldName) => {
    const updatedFilterState = { ...filterState, [fieldName]: "" };
    const updateAppliedFilterState = { ...appliedFilterShow };
    delete updateAppliedFilterState[fieldName];
    setAppliedFilterShow(updateAppliedFilterState);
    setFilterState(updatedFilterState);
  };

  const content = (
    <div>
      <FilterComponent
        filter={filterFields}
        applyFilter={handleApplyFilter}
        setPopoverVisible={setPopoverVisible}
      />
    </div>
  );

  const handleViewMore = (applicantId) => {
    const applicantDetails = applications.data.filter(
      (applicant) => applicant.id === applicantId
    );
    setViewMoreApplicant(applicantDetails);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return viewMoreApplicant.length > 0 ? (
    viewMoreApplicant.map((details) => {
      return (
        <main className="application-view-more-container" key={details.id}>
          <div className="left-side">
            <div className="top-section">
              <div className="application-name" style={{ cursor: "pointer" }}>
                <p className="heading" onClick={() => handleViewMore([])}>
                  Applications list
                </p>
                <img src="/public/icons/dropdown.svg" alt="" />
                <p className="name">
                  {details.first_name} {details.last_name}
                </p>
              </div>
              <div className="search-input">
                <button
                  className="btn primary-medium"
                  onClick={() => handleViewMore([])}
                >
                  Back
                </button>
              </div>
            </div>
            <div className="personal-and-education-section">
              <div className="personal-details-heading-section flex">
                <h1 className="heading-name">Personal Details</h1>
                <div className="horizon-line"></div>
              </div>
              <div className="personal-details-section flex">
                <div className="personal-detial-background">
                  <div className="details-section">
                    <p className="personal-detial-title">Name</p>
                    <p className="personal-detial-name">
                      {details.first_name} {details.last_name}
                    </p>
                  </div>
                </div>
                <div className="personal-detial-background">
                  <div className="details-section">
                    <p className="personal-detial-title">Email id</p>
                    <p className="personal-detial-name">{details.email}</p>
                  </div>
                </div>
                <div className="personal-detial-background">
                  <div className="details-section">
                    <p className="personal-detial-title">Gender</p>
                    <p className="personal-detial-name">Male</p>
                  </div>
                </div>
                <div className="personal-detial-background">
                  <div className="details-section">
                    <p className="personal-detial-title">Date of Birth</p>
                    <p className="personal-detial-name">{details.dob}</p>
                  </div>
                </div>
                <div className="personal-detial-background">
                  <div className="details-section">
                    <p className="personal-detial-title">Street Address</p>
                    <p className="personal-detial-name">{details.address}</p>
                  </div>
                </div>
              </div>
              <div className="personal-details-section-two flex">
                <div className="personal-detial-background">
                  <p className="personal-detial-title">Contact Number</p>
                  <span className="personal-detial-name">
                    {details.contact_number}
                  </span>
                </div>
                <div className="personal-detial-background">
                  <p className="personal-detial-title">Whatsapp Number</p>
                  <span className="personal-detial-name">
                    {details.whatsapp_number}
                  </span>
                </div>
                <div className="personal-detial-background">
                  <p className="personal-detial-title">Aadhar Number</p>
                  <span className="personal-detial-name">
                    {details.aadhaar_number}
                    <a>View document</a>
                  </span>
                </div>
              </div>
              <div className="Guardian-details-heading-section">
                <p className="heading-name">Guardian Details</p>
                <div className="line"></div>
              </div>
              <div className="Guardian-details-section flex">
                <div className="Guardian-detial-background">
                  <div className="details-section">
                    <p className="Guardian-detial-title">
                      Guardian/Parent Name
                    </p>
                    <p className="Guardian-detial-name">
                      {details.care_taker_name}
                    </p>
                  </div>
                </div>
                <div className="Guardian-detial-background">
                  <div className="details-section">
                    <p className="Guardian-detial-title">
                      Guardian/Parent Relationship
                    </p>
                    <p className="Guardian-detial-name">
                      {details.care_taker_relation}
                    </p>
                  </div>
                </div>
                <div className="Guardian-detial-background">
                  <div className="details-section">
                    <p className="Guardian-detial-title">
                      Guardian/Parent Phone Number
                    </p>
                    <p className="Guardian-detial-name">
                      {details.care_taker_number}
                    </p>
                  </div>
                </div>
                <div className="Guardian-detial-background">
                  <div className="details-section">
                    <p className="Guardian-detial-title">
                      Annual Family Income
                    </p>
                    <p className="Guardian-detial-name">
                      {details.annual_income}
                    </p>
                  </div>
                </div>
                <div className="Guardian-detial-background">
                  <div className="details-section">
                    <p className="Guardian-detial-title">Ration/Family Card</p>
                    <p className="Guardian-detial-name">
                      <a>View document</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="Educational-details-heading-section">
                <p className="heading-name">Educational Details</p>
                <div className="line"></div>
              </div>
              <div className="Educational-details-list-container">
              {details.applicant_academies.map((academy) => (
                  <div
                    key={academy.id}
                    className="educational-background-second-container"
                  >
                    <div className="curent-qul">
                      <p>
                        Educational Qualification:{" "}
                        <a href="">{academy.degree.name}</a>
                      </p>
                    </div>
                    <div className="educational-details flex">
                      <div className="school-type">
                        <span>School Type</span>
                        <p>{academy.insitution_type}</p>
                      </div>
                      <div className="year-completion">
                        <span>Year Completion</span>
                        <p>{academy.year_of_completion}</p>
                      </div>
                      <div className="medium">
                        <span>Medium</span>
                        <p>{academy.medium_of_instruction}</p>
                      </div>
                      {details.applicant_marks &&
                        details.applicant_marks.map((marks) => (
                          <div className="subject-score">
                            <span>
                              {marks.degree_subject.degree.name} Score
                            </span>
                            <p>{marks.mark}%</p>
                          </div>
                        ))}
                      <div className="total-percentage">
                        <span>Total Percentage</span>
                        <p>
                          {academy.percentage}% <a href="">View document</a>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* <div className="skillset-and-other-details flex">
                <div className="skillset-container">
                  <div className="skillset-details-heading-section">
                    <p className="heading-name">Other Skillset</p>
                    <div className="line"></div>
                  </div>

                  <div className="skillset-detial-background-section">
                    <div className="details-section">
                      <p className="skillset-detial-title">
                        Extra cuticular certificates or creative work of yours
                      </p>
                      <p className="skillset-detial-name"></p>
                    </div>
                  </div>
                  <div className="skillset-detial-background-section">
                    <div className="details-section">
                      <p className="skillset-detial-title">
                        Computer course certification
                      </p>
                      <p className="skillset-detial-name"></p>
                    </div>
                  </div>
                </div>
                <div className="Learning-devices-section">
                  <div className="Learning-details-heading-section">
                    <p className="heading-name">Learning Devices</p>
                    <div className="line"></div>
                  </div>

                  <div className="Learning-detial-background">
                    <div className="details-section">
                      <p className="Learning-detial-title">
                        What Device You/ Your Famil own?
                      </p>
                      <p className="Learning-detial-name"></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="genaral-details-section">
                <div className="genaral-details-heading-section">
                  <p className="heading-name">Genaral Details</p>
                  <div className="line"></div>
                </div>

                <div className="general-details-list-container flex">
                  <div className="left-side-genaral-detial-background">
                    <div className="first-section">
                      <span>How did you come to know DCKAP Palli Program?</span>
                      <p></p>
                    </div>
                    <div className="second-section">
                      <span>
                        Please leave any additional information if you would
                        like to share with us
                      </span>
                      <p></p>
                    </div>
                  </div>
                  <div className="right-side-genaral-detial-background">
                    <div className="first-section">
                      <span> Why do you want to take up this training? </span>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </main>
      );
    })
  ) : (
    <main className="application-full-container">
      <div className="application-main-container flex">
        <div className="header-name">
          <h1>Application list</h1>
        </div>
        <div className="application-actions flex">
          <div className="import">
            <button className="btn primary-medium">Import</button>
          </div>
        </div>
      </div>
      <div className="application-inner-container">
        <div className="search-container">
          <img
            src="/public/icons/searchIcon.svg"
            alt=""
            className="search-icon"
          />
          <input
            type="text"
            value={applicationSearch}
            placeholder="Search here"
            onChange={(e) => setApplicationSearch(e.target.value)}
          />

          <Popover
            placement="leftTop"
            open={popoverVisible}
            onOpenChange={(visible) => setPopoverVisible(visible)}
            content={content}
            trigger={["click"]}
          >
            <img
              src="/public/icons/filterIcon.svg"
              alt=""
              className="filter-icon"
            />
          </Popover>
        </div>
        <div className="filter-or-search-container">
          {applicationSearch.length > 0 ? (
            <>
              <Tag color="#49a843">Search : {applicationSearch} </Tag>
              <img
                src="/public/icons/Cancel.svg"
                className="cancel-btn"
                onClick={() => setApplicationSearch("")}
              />
            </>
          ) : (
            ""
          )}
          {/* {appliedFilterShow &&
            Object.keys(appliedFilterShow).map((filterName) => (
              <>
                <Tag color="#49a843">{`${filterName} : ${appliedFilterShow[filterName]} `}</Tag>
                <img
                  src="/icons/Cancel.svg"
                  alt=""
                  className="cancel-btn"
                  onClick={() => handleRemoveFilter(filterName)}
                />
              </>
            ))} */}
        </div>

        {applications.data.length > 0 ? (
          <>
            <div className="application-list-container">
              {isLoading ? (
                <Skeleton active paragraph={20} />
              ) : (
                applications.data.map((application) => (
                  <div
                    className="application-card-container"
                    key={application.id}
                    onClick={() => handleViewMore(application.id)}
                  >
                    <div className="application-details-container flex">
                      <div className="application-info flex">
                        <div className="application-name-container">
                          <p>
                            {application.first_name[0].toUpperCase()}
                            {application.last_name[0].toUpperCase()}
                          </p>
                        </div>
                        <div className="application-email-container">
                          <p className="application-name">
                            <Tooltip
                              title={`${application.first_name
                                .charAt(0)
                                .toUpperCase()}${application.first_name.slice(
                                1
                              )} ${application.last_name
                                .charAt(0)
                                .toUpperCase()}${application.last_name.slice(
                                1
                              )}`}
                            >
                              {truncateText(
                                `${application.first_name
                                  .charAt(0)
                                  .toUpperCase()}${application.first_name.slice(
                                  1
                                )} ${application.last_name
                                  .charAt(0)
                                  .toUpperCase()}${application.last_name.slice(
                                  1
                                )}`,
                                15
                              )}
                            </Tooltip>
                          </p>
                          <p className="application-email">
                            {truncateText(application.email, 15)}
                          </p>
                        </div>
                      </div>
                      <div className="application-gender">
                        <p>Gender</p>
                        <span>Male</span>
                      </div>
                      <div className="application-dob">
                        <p>Date of Birth</p>
                        <span>
                          {dayjs(application.dob).format("MMM DD, YYYY")}
                        </span>
                      </div>
                      <div className="application-district">
                        <p>District</p>
                        <span>{application.district.charAt(0).toUpperCase()}{application.district.slice(1).toLowerCase()}</span>
                      </div>
                      <div className="application-qualification">
                        <p>Qualification</p>
                        <span>Diploma</span>
                      </div>
                      <div className="application-mobile-no">
                        <p>Mobile No</p>
                        <span>{application.contact_number}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="application-pagination-container flex">
              {applications.data.length > 0 && (
                <Pagination
                  className="pagination"
                  current={applications.currentPage}
                  pageSize={limit}
                  total={applications.total}
                  onChange={(page) => setPage(page)}
                />
              )}
            </div>
          </>
        ) : (
          <div className="flex no-data-container">
            <img src="/icons/no-data.svg" className="no-data-image" />
          </div>
        )}
      </div>
    </main>
  );
};

export default Applications;
