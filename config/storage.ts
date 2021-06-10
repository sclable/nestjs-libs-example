import { join } from 'path';
import { registerAs } from '@nestjs/config';
import { StorageModuleOptions, StorageType } from '@sclable/nestjs-storage';

export default registerAs(
  'storage',
  (): StorageModuleOptions => ({
    defaultDriver: (process.env.STORAGE_DEFAULT_DRIVER ||
      StorageType.DUMMY) as StorageType,
    config: {
      [StorageType.DUMMY]: {
        enabled: true,
      },
      [StorageType.LOCAL]: {
        basePath: join(
          __dirname,
          '../..',
          process.env.STORAGE_LOCAL_BASE_PATH || 'storage',
        ),
      },
    },
  }),
);
