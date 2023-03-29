import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import Router from "next/router";
import { ProjectProps } from "../../interfaces/Project";
import { ProjectUserWithRoleAndUser } from "../../interfaces/Project";

import prisma from "../../lib/prisma";
import { useSession } from "next-auth/react";


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const project = await prisma.project.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      users: {
        include: {
          role: true,
          user: true,
        },
      },
    },
  });
  return {
    props: project,
  };
};

async function publishProject(id: number): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/");
}

async function deleteProject(id: number): Promise<void> {
  await fetch(`/api/project/${id}`, {
    method: "DELETE",
  });
  await Router.push("/");
}

const Project: React.FC<ProjectProps> = (props) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }

  const userHasValidSession = Boolean(session);

  let projectUsers: Array<ProjectUserWithRoleAndUser> = props.users;

  let admins =
    projectUsers &&
    projectUsers.filter((projectUser) => projectUser.role.name === "Admin");

  let currentAdmin = admins ? admins[0]?.user.name : undefined;

  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {currentAdmin}</p>
        <ReactMarkdown children={props.content} />
        {!props.published && userHasValidSession && (
          <button onClick={() => publishProject(props.id)}>Publish</button>
        )}
        {userHasValidSession && (
          <button onClick={() => deleteProject(props.id)}>Delete</button>
        )}
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Project;
