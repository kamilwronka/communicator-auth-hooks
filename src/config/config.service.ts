import * as dotenv from 'dotenv';

dotenv.config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value.trim();
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const env = this.getValue('ENV', false);
    return env !== 'DEV';
  }

  public getRabbitMQConfig() {
    return {
      host: this.getValue('RABBITMQ_HOST'),
      port: this.getValue('RABBITMQ_PORT'),
      user: this.getValue('RABBITMQ_USER'),
      password: this.getValue('RABBITMQ_PASSWORD'),
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'PORT',
  'RABBITMQ_USER',
  'RABBITMQ_PASSWORD',
  'RABBITMQ_HOST',
  'RABBITMQ_PORT',
]);

export { configService };
