import '../styles/globals.css'
import dynamic from 'next/dynamic'
import "nprogress/nprogress.css";
import { BrowserView, MobileView } from 'react-device-detect';


const TopProgressBar = dynamic(
  () => {
    return import("../components/TopProgressBar");
  },
  { ssr: false },
);

function MyApp({ Component, pageProps }) {

  return <>
    <BrowserView>
      <div className="container">
        <h3 align="center">Please Use Your Fucking Phone</h3>
        <h3 align="center">Thanks a lot :)</h3>
      </div>
    </BrowserView>
    <MobileView>
      <TopProgressBar />
      <Component {...pageProps} />
    </MobileView>
  </>
}

export default MyApp
