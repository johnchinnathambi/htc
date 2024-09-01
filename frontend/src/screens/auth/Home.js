import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard | HTC Accounting</title>
        <meta
          property="og:title"
          content="Dashboard - HTC Accounting"
          key="title"
        />
      </Helmet>
      <div className="page-wrapper flex flex-col relative">
        
      </div>
    </>
  );
};

export default Home;
