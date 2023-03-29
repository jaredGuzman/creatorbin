import Router from "next/router";
import React, { useState } from "react";
import prisma from "../lib/prisma";

import { useSession } from "next-auth/react";

import { NewProjectProps } from "../interfaces/Project";
import Layout from "../components/Layout";



export const getServerSideProps = async () => {
  const users = await prisma.user.findMany();
  const roles = await prisma.role.findMany();
  return {
    props: {
      users: users,
      roles: roles
    },
  };
};



// export const getServerSideProps: GetServerSideProps = async ({params}) => {
//   const user = await prisma.user.findUnique({
//     where: {
//       email: Array.isArray(params.email) ? params.email[0] : params.email,
//     },
//   });
//   return {
//     props: user
//   }
// }

const NewProject: React.FC<NewProjectProps> = (props) => {
  const [title, setTitle] = useState("");

  const { data: session, status } = useSession();

  const allUsers = props.users;
  const allRoles = props.roles;

  const currentUser = allUsers.filter(
    (user) => user.email === session.user.email
  );

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    let author = currentUser["name"];
    let changes = [
      {
        description: `Project ${title} created by ${author} at ${Date.now()}`,
      },
    ];
    let projectResponse;

    // still don't know how to make a post request with this info attached here
    try {
      const projectBody = { title };
      await fetch(`/api/project`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectBody),
      }).then((response) => {
        projectResponse = response.json();
      }).then((result) => {

        console.log(projectResponse.result)
        console.log(currentUser);
        console.log(allRoles);

        let newProjectUser = {}

        fetch('/api/projectUser', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProjectUser)
        })
      });

      await Router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <input disabled={!title} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default NewProject;
