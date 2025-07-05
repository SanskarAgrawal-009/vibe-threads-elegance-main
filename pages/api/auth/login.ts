import { NextApiRequest, NextApiResponse } from 'next';
import User from '@/backend/models/User';
import dbConnect from '@/lib/dbConnect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect();
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
}
