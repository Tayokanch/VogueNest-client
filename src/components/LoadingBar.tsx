import 'react-toastify/dist/ReactToastify.css';
import { Bars } from 'react-loader-spinner';

const LoadingBar = () => {
  return (
    <Bars
      height="50"
      width="80"
      color="gray"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible
    />
  );
};

export default LoadingBar;
