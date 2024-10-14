import { GoogleAnalytics as GA } from '@next/third-parties/google';

const GoogleAnalytics = () => <GA gaId={process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID!} />;

export default GoogleAnalytics;
