import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

import {
  ProjectProps,
  ProjectUserWithRoleAndUser,
} from "../interfaces/Project";

const Project: React.FC<{ project: ProjectProps }> = ({ project }) => {
  let projectUsers: Array<ProjectUserWithRoleAndUser> = project.users;

  let admins =
    projectUsers &&
    projectUsers.filter((projectUser) => projectUser.role.name === "Admin");

  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${project.id}`)}>
      <h2>{project.title}</h2>
      <small>By {admins[0]?.user.name}</small>
      <ReactMarkdown children={project.content} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Project;
