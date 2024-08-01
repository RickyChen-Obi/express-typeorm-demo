import { App } from '@/app';
import { PolicyholderRoute } from '@routes/policyholder.route';
import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();
try {
  const app = new App([new PolicyholderRoute()]);
  app.listen();
} catch (e) {
  console.log(e);
}
