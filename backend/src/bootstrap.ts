import main from '.';
import { AppDataSource } from './config/db';

AppDataSource.initialize()
  .then(main)
  .catch((err) => {
    console.error(`Failed to initialize DB : `, err);
    process.exit(1);
  });
