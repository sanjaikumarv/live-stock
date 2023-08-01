import Layout from "../components/Common/Layout";
import Header from "../components/Home/Header";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className='bg-white dark:bg-bgGray relative text-black dark:text-white'>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

export default MyApp;
