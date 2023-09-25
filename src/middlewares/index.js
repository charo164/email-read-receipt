export const findIpAdress = (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  res.locals.ip = ip || 'unknown';
  next();
};
