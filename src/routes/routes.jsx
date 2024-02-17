//Define all the routes here
const INDEX = "/";
const LOGIN = "/login";
const FORGOTPASSWORD = "/forgot/password";
//
const CHANGEPASSWORD = "/change/password";

const DASHBOARD = "/dashboard";
const APPLICATIONS = "/batch/:id/applications";
const MODULE = "/batch/:id/module";

//new changes
const APPLICATIONVIEW = "/batch/:id/application/view/more"
const TASKMODULE = "/batch/:id/task";
const ASSESSMENTMODULE = "/batch/:id/assessment";
const APPLICATIONFORM = "/application/form";
//

const ADDTASK = "/batch/:id/module/add/task";
const EDITTASK = "/batch/:id/module/edit/task/:taskId";
const ADDQUIZ = "/batch/:id/module/add/quiz";
const WEIGHTAGE = "/batch/:id/module/add/task/weightage";

export {
  DASHBOARD,
  LOGIN,
  APPLICATIONS,
  FORGOTPASSWORD,
  CHANGEPASSWORD,
  MODULE,
  WEIGHTAGE,
  ADDTASK,
  ADDQUIZ,
  INDEX,
  EDITTASK,
  TASKMODULE,
  ASSESSMENTMODULE,
  APPLICATIONVIEW,
  APPLICATIONFORM
};
