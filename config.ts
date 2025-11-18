import path from 'path';
import dotenv from 'dotenv';

const dotenvConfigResult = dotenv.config({
  // eslint-disable-next-line n/no-process-env
  path: path.join(__dirname, `./config/.env.${process.env.NODE_ENV}`),
});
if (dotenvConfigResult.error) {
  throw dotenvConfigResult.error;
}
