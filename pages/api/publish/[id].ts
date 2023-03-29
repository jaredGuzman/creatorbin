import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma'

// PUT /api/publish/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const projectId = req.query.id;
  const session = await getSession({ req })

  if (session) {
    const project = await prisma.project.update({
      where: { id: Number(projectId) },
      data: { published: true },
    });
    res.json(project);
  } else {
    res.status(401).send({ message: 'Unauthorized' })
  }
}
