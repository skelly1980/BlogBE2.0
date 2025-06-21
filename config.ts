import path from 'path';
import dotenv from 'dotenv';

const dotenvConfigResult = dotenv.config({
  path: path.join(__dirname, `./config/.env.${process.env.NODE_ENV}`),
});
if (dotenvConfigResult.error) {
  throw dotenvConfigResult.error;
}
