import React, { useState } from 'react'
import { Tabs } from 'antd';
const { TabPane } = Tabs;

const ApplicationForm = () => {
    const [applicationForm, setApplicationFrom] = useState({});
    const [currentTab, setCurrentTab] = useState("1")
    const onchange = (event) => {
        const { name, value, type, files } = event.target;

        // If the target is a file input
        if (type === 'file') {
            // Access the uploaded file(s)
            const file = files[0]; // Assuming single file upload

            // Update state with both file and its name
            setApplicationFrom({ ...applicationForm, [name]: { file, fileName: file.name } });
        } else {
            // For other input types (text, select, radio, etc.)
            setApplicationFrom({ ...applicationForm, [name]: value });
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        
    }



    const handleNextTab = () => {
        let nextTab = parseInt(currentTab) + 1;
        setCurrentTab(nextTab.toString());
    };

    const handlePreviousTab = () => {
        let previousTab = parseInt(currentTab) - 1;
        setCurrentTab(previousTab.toString());
    };

    return (
        <div className="application-form-main-container flex" style={{ justifyContent: "space-between" }}>
            <div className="requirement-criteria-container" style={{ width: "400px" }}>
                Eligibility criteria
                1. Only Students from Tamilnadu are eligible to apply
                2. DOB: After Jan 1, 2003, Before December 31, 2007
                3. Highest Qualification: Class12/ 10+3 Diploma / 12+2 Diploma (At least in the final/semester of Diploma) - the year of passing: 2024
                4. Students from an underprivileged or low-incom background with an annual family income of less than 3 laks
                5. Mandatory Subject: Maths/Business Maths, Science / Computer Science, English (Medium of schooling in Native language is not a barrier).
                6. Degree holders or those who are currently in their graduation are not eligible.
                Note: This form requires you to upload Aadhar, Ration Card, Income Certificate, and extracurricular activities certificates (optional) and share details on 10th & 12th/ Diploma marks and other details. Please keep the information handy while filling out the form.
            </div>
            <div className="application-form-container">
                <div className="meu-content">
                    <Tabs activeKey={currentTab} defaultActiveKey="1" items={[
                        {
                            key: "1",
                            label: <span><img style={{ width: "20px" }} src='/icons/personal.svg' />Personal Details</span>,
                            children: (
                                <div className="personal-container">
                                    <div className="personal-form">
                                        <div className="row-one">
                                            <div className="applicant-name">
                                                <label htmlFor="">Student Name</label>
                                                <input type="text" style={{ border: "1px solid grey" }} name='student-name' onChange={onchange} />
                                            </div>
                                            <div className="applicant-dob">
                                                <label htmlFor="">Student Date of Birth *</label>
                                                <input type="date" style={{ border: "1px solid grey" }} name="dob" onChange={onchange} />
                                            </div>
                                            <div className="applicant-name">
                                                <label htmlFor="">Gender</label>
                                                <input type="text" style={{ border: "1px solid grey" }} name="gender" onChange={onchange} />
                                            </div>

                                        </div>
                                        <div className="row-two">English Score
                                            <div className="applicant-email">
                                                <label htmlFor="">Email id *</label>
                                                <input type="text" style={{ border: "1px solid grey" }} name="email" onChange={onchange} />
                                            </div>
                                            <div className="applicant-contact-number">
                                                <label htmlFor="">Contact Number *</label>
                                                <input type="text" style={{ border: "1px solid grey" }} name="content-number" onChange={onchange} />
                                            </div>

                                        </div>
                                        <div className="row-three">
                                            <div className="applicant-whatsapp-number">
                                                <label htmlFor="">Whatsapp Phone Number</label>
                                                <input type="text" style={{ border: "1px solid grey" }} name="whatsapp-number" onChange={onchange} />
                                            </div>
                                            <div className="applicant-address">
                                                <label htmlFor="">Street Address *</label>
                                                <input type="text" style={{ border: "1px solid grey" }} name="address" onChange={onchange} />
                                            </div>
                                            <div className="applicant-apartment">
                                                <label htmlFor="">Apartment, suite, etc *</label>
                                                <input type="text" style={{ border: "1px solid grey" }} name="apartment" onChange={onchange} />
                                            </div>

                                        </div>
                                        <div className="row-four">
                                            <div className="applicant-postcode">
                                                <label htmlFor="">ZIP / Postal Code *</label>
                                                <input type="text" style={{ border: "1px solid grey" }} name="post-code" onChange={onchange} />
                                            </div>
                                            <div className="applicant-city">
                                                <label htmlFor="">City</label>
                                                <input type="text" style={{ border: "1px solid grey" }} name="city" onChange={onchange} />
                                            </div>
                                            <div className="applicant-whatsapp-number">
                                                <label htmlFor="">Country</label>
                                                <input type="text" style={{ border: "1px solid grey" }} name="country" onChange={onchange} />
                                            </div>
                                        </div>
                                        <div className="row-five">
                                            <div className="applicant-whatsapp-number">
                                                <label htmlFor="">Aadhar Card Number *</label>
                                                <input type="text" style={{ border: "1px solid grey" }} name="aadhar-number" onChange={onchange} />
                                            </div>
                                            <div className="applicant-postcode">
                                                <label htmlFor="">Upload the Aadhar Card *</label>
                                                <input type="file" style={{ border: "1px solid grey" }} name="aadhar-doc" onChange={onchange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        },
                        {
                            key: "2",
                            label: <span><img style={{ width: "20px" }} src='/icons/guardian.svg' />Parent/Guardian Details</span>,
                            children: (
                                <div className="guardian-details-container">
                                    <div className="guardian-form">
                                        <div className="row-one">
                                            <div className="parent-name">
                                                <label htmlFor="">Guardian/Parent Name *</label>
                                                <input type="text" style={{ border: "1px solid grey" }} name="parent-name" onChange={onchange} />
                                            </div>
                                            <div className="parent-name">
                                                <label htmlFor="">Guardian/Parent Relationship *</label>
                                                <input type="text" style={{ border: "1px solid grey" }} name="guardian-relationship" onChange={onchange} />
                                            </div>
                                            <div className="parent-name">
                                                <label htmlFor="">Guardian/Parent Phone Number *</label>
                                                <input type="text" style={{ border: "1px solid grey" }} name="guardian-number" onChange={onchange} />
                                            </div>
                                        </div>
                                        <div className="row-two">
                                            <div className="annual-income">
                                                <label htmlFor="">Annual Family Income *</label>
                                                <input type="text" style={{ border: "1px solid grey" }} name="annual-income" onChange={onchange} />
                                            </div>
                                            <div className="smart-card">
                                                <label htmlFor="">Upload the Smart Card *</label>
                                                <input type="file" name="smart-card-file" onChange={onchange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        },
                        {
                            key: "3",
                            label: <span><img style={{ width: "20px" }} src='/icons/education.svg' />Education Details</span>,
                            children: (
                                <div className="education-details-container">
                                    <div className="education-form">
                                        <div className="row-one">
                                            <div className="current-education">
                                                <label htmlFor="">Currently Eductional Qualification *</label>
                                                <div className="education-options">
                                                    <div className="one">
                                                        <label htmlFor="">Currently in 12th</label>
                                                        <input type="radio" name="current-12" onChange={onchange} />
                                                    </div>
                                                    <div className="two">
                                                        <label htmlFor="">Completed 12th</label>
                                                        <input type="radio" name="completed-12" onChange={onchange} />
                                                    </div>
                                                    <div className="three">
                                                        <label htmlFor="">Currently pursuing Diploma</label>
                                                        <input type="radio" name="pursuing-diploma" onChange={onchange} />
                                                    </div>
                                                    <div className="four">
                                                        <label htmlFor="">Completed Diploma</label>
                                                        <input type="radio" name="completed-diploma" onChange={onchange} />
                                                    </div>
                                                    <div className="five">
                                                        <label htmlFor="">others</label>
                                                        <input type="radio" name="others" onChange={onchange} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row-two">
                                            <h6>10th Standard Details</h6>
                                            <div className="10th">
                                                <label htmlFor="">10th: Medium of Instruction *</label>
                                                <select id="" name="10th-medium" onChange={onchange}>
                                                    <option value=""></option>
                                                </select>
                                            </div>
                                            <div className="10th">
                                                <label htmlFor="">10th: School Type *</label>
                                                <select id="" name="10th-school-type" onChange={onchange}>
                                                    <option value=""></option>
                                                </select>
                                            </div>
                                            <div className="10th">
                                                <label htmlFor="">10th: Year of Completion  *</label>
                                                <select id="" name="10th-year-completion" onChange={onchange}>
                                                    <option value=""></option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row-three">
                                            <div className="10th">
                                                <label htmlFor="">10th: Math & English Score *</label>
                                                <input type="text" style={{ border: "1px solid grey" }} name="English Score" onChange={onchange} />
                                                <input type="text" style={{ border: "1px solid grey" }} name="English Score" onChange={onchange} />
                                            </div>
                                            <div className="10th">
                                                <label htmlFor="">Total Percentage *</label>
                                                <input type="text" style={{ border: "1px solid grey" }} name="Percentage" onChange={onchange} />
                                            </div>
                                            <div className="10th">
                                                {/* mark sheet view*/}
                                            </div>
                                        </div>
                                        <div className="row-four">
                                            <div className="heading">
                                                <h6>12th Standard or Diploma Details</h6>
                                                <div className="hr-line"></div>
                                            </div>
                                            <div className="10th">
                                                <label htmlFor="">Medium of Instruction *</label>
                                                <select name="" id="">
                                                    <option value=""></option>
                                                </select>
                                            </div>
                                            <div className="10th">
                                                <label htmlFor="">School Type *</label>
                                                <select name="" id="">
                                                    <option value=""></option>
                                                </select>
                                            </div>
                                            <div className="10th">
                                                <label htmlFor="">Year of Completion  *</label>
                                                <select name="" id="">
                                                    <option value=""></option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row-five">
                                            <div className="match-english-score">
                                                <label htmlFor="">Math & English Score *</label>
                                                <input type="text" style={{ border: "1px solid grey" }} name="English Score" onChange={onchange} />
                                                <input type="text" style={{ border: "1px solid grey" }} name="English Score" onChange={onchange} />
                                            </div>
                                            <div className="total-percentage">
                                                <label htmlFor="">Total Percentage *</label>
                                                <input type="text" style={{ border: "1px solid grey" }} name="Percentage" onChange={onchange} />
                                            </div>
                                            <div className="upload-mark-sheet">
                                                <label htmlFor="">Upload the Mark sheet *</label>
                                                <input type="file" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        },
                        {
                            key: "4",
                            label: <span><img style={{ width: "20px" }} src='/icons/others.svg' />Other Details</span>,
                            children: (
                                <div className="other-details-container">
                                    <div className="other-details-form">
                                        <div className="row-one">
                                            <div className="other-cer-section">
                                                <div className="extra-cur">
                                                    <label htmlFor="">Mention any extra curricular certificates or creative work of yours</label>
                                                    <input type="text" style={{ border: "1px solid grey" }} name="curricular" onChange={onchange} />
                                                </div>
                                                <div className="computer-certificate">
                                                    <label htmlFor="">Computer Course Completion Certification - if any</label>
                                                    <input type="text" style={{ border: "1px solid grey" }} name="Course-Completion" onChange={onchange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row-two">
                                            <div className="heading">
                                                <h6>Learning Devices</h6>
                                                <div className="hr-line"></div>
                                            </div>
                                            <div className="others">
                                                <p>We would like to understand the student’s accessibility to devices to  take up the preliminary entrance post their application screening</p>
                                                <div className="device">
                                                    <p>What device you / your family own? *</p>
                                                    <div className="options">
                                                        <div className="option-row-one">
                                                            <div className="sub-row-one">
                                                                <input type="radio" />
                                                                <label htmlFor="">Smart Phone with Internet Connectivity</label>
                                                            </div>
                                                            <div className="sub-row-two">
                                                                <input type="radio" />
                                                                <label htmlFor="">Laptop with Internet Connectivity</label>
                                                            </div>
                                                        </div>
                                                        <div className="option-row-two">
                                                            <div className="sub-row-one">
                                                                <input type="radio" />
                                                                <label htmlFor="">Tablet with Internet Connectivity</label>
                                                            </div>
                                                            <div className="sub-row-two">
                                                                <input type="radio" />
                                                                <label htmlFor="">Desktop with Internet Connectivity</label>
                                                            </div>
                                                        </div>
                                                        <div className="option-row-three">
                                                            <div className="sub-row-one">
                                                                <input type="radio" />
                                                                <label htmlFor="">I don’t have accessibility to phone or any devices. Looking forward to your support to appear in  entrance exam</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row-three">
                                            <div className="heading">
                                                <h6>General Questions</h6>
                                                <div className="hr-line"></div>
                                            </div>
                                            <div className="palli">
                                                <label htmlFor="">How did you come to know about DCKAP Palli Program? *</label>
                                                <select name="" id="">
                                                    <option value=""></option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row-four">
                                            <div className="trainering">
                                                <label htmlFor="">Why do you want to take up this training?   *</label>
                                                <input type="text" style={{ border: "1px solid grey" }} name="training" onChange={onchange} />
                                            </div>
                                            <div className="trainering">
                                                <label htmlFor="">Please leave any additional information if you would like to  share with us  *</label>
                                                <input type="text" style={{ border: "1px solid grey" }} name="information" onChange={onchange} />
                                            </div>
                                            <div className="agree-button">
                                                <div className="agree">
                                                    <input type="checkbox" />
                                                    <p>I AGREE that the given data is true to the best of my knowledger</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    ]} />
                    <div className="save-per-button-section" style={{ display: "flex", justifyContent: "end" }}>
                        {currentTab !== "1" && (
                            <button className="btn secondary-medium" onClick={handlePreviousTab} >Previous</button>
                        )}
                        {currentTab !== "4" && (
                            <button className="btn primary-medium" style={{ width: "100px" }} onClick={handleNextTab}>Next</button>
                        )}
                        {currentTab === "4" && (
                            <button className="btn primary-medium" style={{ width: "100px" }} onClick={handleSubmit}>Save</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ApplicationForm;