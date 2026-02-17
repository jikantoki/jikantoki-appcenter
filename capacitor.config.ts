import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'xyz.enoki.appcenter',
  appName: 'ENOKI Appcenter',
  webDir: 'dist',
  plugins: {
    StatusBar: {
      overlaysWebView: false,
    },
    // BackgroundRunner: {
    //   label: 'xyz.enoki.wallet.background',
    //   src: 'runners/background-runner.js',
    //   event: 'CapacitorTemplateBackgroundRunner',
    //   repeat: true,
    //   /** OSの制約で15分間隔 */
    //   interval: 15,
    //   autoStart: true,
    // },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    CapacitorHttp: {
      enabled: true,
    },
  },
  server: {
    hostname: 'app.enoki.xyz',
    androidScheme: 'https',
  },
  // deepLinks: {
  //   enabled: true,
  //   prefixes: ['capacitor://', 'https://app.enoki.xyz'],
  // },
  android: {
    // useLegacyBridge: true,
    // notificationIcon: 'ic_location_status',
  },
}

export default config
