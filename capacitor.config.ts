import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kampuskonnect.sa',
  appName: 'Kampus Konnect SA',
  webDir: 'public',
  server: {
    url: 'https://kampus-konnect-sa-production-ready.vercel.app',
    cleartext: false
  }
};

export default config;
