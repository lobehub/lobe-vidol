import Google from './Google';
import Plausible from './Plausible';
import Vercel from './Vercel';

const Analytics = () => {
  return (
    <>
      {<Vercel />}
      {<Google />}
      {
        <Plausible
          scriptBaseUrl={process.env.PLAUSIBLE_SCRIPT_BASE_URL}
          domain={process.env.PLAUSIBLE_DOMAIN}
        />
      }
    </>
  );
};

export default Analytics;
