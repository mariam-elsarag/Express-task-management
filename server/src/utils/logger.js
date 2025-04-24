const logger = {
  info: (msg) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${msg}`);
  },
  error: (msg, err = null) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${msg}`);
    if (err) console.error(err);
  },
};

export default logger;
