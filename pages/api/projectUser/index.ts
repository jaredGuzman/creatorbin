import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

// POST /api/projectUser
// Required fields in body: project
// Optional fields in body: user
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { project, user, adminRole } = req.body;

  const session = await getSession({ req });
  if (session) {
    const result = await prisma.projectUser.create({
      data: { 
        userId: user?.id,
        projectId: project?.id,
        roleId: adminRole
     },
    });
    res.json(result);
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}
