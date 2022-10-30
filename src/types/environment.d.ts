import { EEnvironment } from './config/types';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      ENV: EEnvironment;
      MOCKSERVER_URL: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
