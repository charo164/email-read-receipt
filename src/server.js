import { config } from 'dotenv';
import express from 'express';
import path from 'path';
import { connectDB } from './configs/db.js';
import { findIpAdress } from './middlewares/index.js';
import User from './models/User.js';
import { slugify } from './utils/index.js';

config();

(async () => {
  const port = process.env.PORT || 3000;
  const app = express();

  app.use(findIpAdress);

  app.get('/image', async (req, res) => {
    const ip = res.locals.ip;
    const senderEmail = req.query.se;
    const receiverEmail = req.query.re;
    const subject = req.query.su;

    const user = new User({
      sender_email: senderEmail,
      receiver_email: receiverEmail,
      emailSubject: slugify(subject),
      ipAddress: ip,
    });

    await user.save();

    res.status(200).sendFile('image.png', { root: path.join(path.resolve(), './src/images') });
  });

  app.use((req, res) => {
    res.status(404).send('404: Page not Found');
  });

  app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).send('500: Internal Server Error');
  });

  await connectDB();

  app.listen(port, () => {
    console.log('listening on port 3000');
  });
})();
