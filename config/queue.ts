import { registerAs } from '@nestjs/config';
import { QueueModuleOptions, QueueType } from '@sclable/nestjs-queue';

export default registerAs(
  'queue',
  (): QueueModuleOptions => ({
    type: (process.env.QUEUE_TYPE || QueueType.DUMMY) as QueueType,
    config: {
      [QueueType.DUMMY]: {
        enabled: true,
      },
      [QueueType.INMEMORY]: {},
      [QueueType.RABBITMQ]: {
        hostname: process.env.QUEUE_RABBITMQ_HOSTNAME || 'localhost',
        port: +(process.env.QUEUE_RABBITMQ_PORT || 5672),
        username: process.env.QUEUE_RABBITMQ_USERNAME || 'guest',
        password: process.env.QUEUE_RABBITMQ_PASSWORD || 'guest',
      },
      [QueueType.AZURE_SERVICE_BUS]: {
        connectionString:
          process.env.QUEUE_AZURE_SERVICE_BUS_CONNECTION_STRING ||
          'define QUEUE_AZURE_SERVICE_BUS_CONNECTION_STRING',
      },
    },
  }),
);
