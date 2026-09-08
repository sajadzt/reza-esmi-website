import { Project } from "@/types/project";

import { industrialProjects } from "./industrial";
import { officeProjects } from "./office";
import { villaProjects } from "./villa";
import { residentialProjects } from "./residential";

export const projects: Project[] = [
  ...industrialProjects,
  ...officeProjects,
  ...villaProjects,
  ...residentialProjects,
];

export { industrialProjects };
export { officeProjects };
export { villaProjects };
export { residentialProjects };