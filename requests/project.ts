import type { NextApiRequest, NextApiResponse } from 'next';

import { ResponseData } from '../interfaces/Response';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ message: 'Hello from Next.js!' })
}