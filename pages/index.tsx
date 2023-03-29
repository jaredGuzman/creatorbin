import React from "react";
import type { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Project from "../components/Project";
import prisma from "../lib/prisma";

import { DashboardProps } from "../interfaces/Dashboard";

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.project.findMany({
    include: {
      users: {
        include: {
          role: true,
          user: true,
        }
      }
    }
  });
  return {
    props: { feed },
  };
};

const Dashboard: React.FC<DashboardProps> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {props.feed.map((project) => (
            <div key={project.id} className="project">
              <Project project={project} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .project {
          background: white;
          border-radius: 0.25rem;
          transition: box-shadow 0.1s ease-in;
        }

        .project:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .project + .project {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Dashboard;
