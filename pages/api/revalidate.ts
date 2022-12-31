import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Check for secret to confirm this is a valid request
    if (req.body.secret !== process.env.TOKEN) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    try {
        res.revalidate(`/${req.body.path}`);
        return res.json({ revalidated: true });
    } catch (err) {
        return res.status(500).json({
            message: 'Error revalidating',
            error: err
        });
    }
}