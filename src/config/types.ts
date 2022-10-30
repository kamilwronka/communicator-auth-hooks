export interface IAppConfig {
  env: EEnvironment;
  port: number;
}

export interface IServicesConfig {
  users: string;
}

export enum EEnvironment {
  LOCAL = 'local',
  DEV = 'dev',
  PROD = 'prod',
}
