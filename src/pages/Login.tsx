import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoginData } from '../services/interface';
import LoadingBar from '../components/LoadingBar';
import { userAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('redirect') || '/';
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    mode: 'onChange',
  });

  const { login, loading, errorMessage, successMessage, setErrorMessage, setSuccessMessage } = userAuth();

  // Clear messages when component unmounts
  useEffect(() => {
    return () => {
      setErrorMessage(null);
      setSuccessMessage(null);
    };
  }, [setErrorMessage, setSuccessMessage]);

  // Redirect after successful login
  useEffect(() => {
    if (successMessage && successMessage.includes('successful')) {
      navigate(redirectPath);
    }
  }, [successMessage, navigate, redirectPath]);

  const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  const onSubmit = async (data: LoginData) => {
    await login(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-black"
    >
      <div className="inline-flex items-center gap-2 mt-10">
        <p className="prata-regular text-3xl">{'Login'}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      <input
        {...register('email', { required: 'The email field is required' })}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
      />
      {errors.email && <p className="text-red-600">{errors.email.message}</p>}

      <input
        {...register('password', {
          required: 'The password field is required',
          pattern: {
            value: passwordPattern,
            message:
              'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character',
          },
        })}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
      />
      {errors.password && (
        <p className="text-red-600">{errors.password.message}</p>
      )}

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        <Link to="/sign-up">Create account</Link>
      </div>
      
      {/* Display error messages */}
      {errorMessage && <p className="text-red-600 mt-2 text-center">{errorMessage}</p>}
      
      {/* Display success messages */}
      {successMessage && <p className="text-green-600 mt-2 text-center">{successMessage}</p>}
      
      <button
        type="submit"
        className="bg-black text-white font-light px-8 py-2 mt-4"
        disabled={isSubmitting || loading}
      >
        {loading ? <LoadingBar /> : 'Login'}
      </button>
    </form>
  );
};

export default Login;
