import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kampuskonnect.sa',
  appName: 'Kampus Konnect SA',
  webDir: 'public',
  server: {
    url: 'https://kampus.kandktechsolutions.co.za',
    cleartext: false
  }
};

export default config;
