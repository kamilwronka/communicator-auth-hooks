import { registerAs } from '@nestjs/config';
import { IServicesConfig } from './types';

export default registerAs('services', (): IServicesConfig => {
  const { ENV } = process.env;

  const isLocal = ENV === 'local';
  const mockSvcUrl = process.env.MOCKSERVER_URL;

  let config: IServicesConfig;

  if (isLocal) {
    config = {
      users: `${mockSvcUrl}/users`,
    };
  } else {
    config = {
      users: 'http://users:4000',
    };
  }

  return config;
});
