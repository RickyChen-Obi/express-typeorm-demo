import { App } from '@/app';
import { PolicyholderRoute } from '@routes/policyholder.route';
import { ValidateEnv } from '@utils/validateEnv';
import { dbConnection } from './database';

ValidateEnv();

(async () => {
  try {
    await dbConnection();
    const app = new App([new PolicyholderRoute()]);
    app.listen();
  } catch (e) {
    console.log(e);
  }
})();
