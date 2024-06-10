import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import { loginRoute } from '../../utils/APIRoutes';

const validate = values => {
  const errors = {};

 
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.otp) {
    errors.otp = 'Required';
  } else if (values.otp.length < 6) {
    errors.otp = 'Phone no must be 6 digit';
  }

  return errors;
};
function Login() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      otp:'',
    },
    validate,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Send a request to the server to authenticate the user
        const response = await axios.post(loginRoute, {
          email: values.email,
          otp: values.otp,
        });

        console.log(response.data)
        const token = response.data.data.token ? true : false;

        // Store the token in localStorage
        localStorage.setItem('token', token);

        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.data));

        // Display success message
        toast.success(response.data.message);

        navigate("/")

      } catch (error) {
        // Handle any errors
        console.error('Login failed:', error);
        toast.error(error.response.data.message);
      } finally {
        // Reset the form's submitting state
        setSubmitting(false);
      }
    },
  });

  return (
    <>
    <div className='h-screen p-5'>
      <div className='flex justify-center items-center h-1/2'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-20 text-green-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
      </svg>

      </div>
       <form onSubmit={formik.handleSubmit}>
          {/*  */}
            <input id="email" name='email' onChange={formik.handleChange}
            className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${formik.errors.email ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5`}
            type="email"
            placeholder="Enter your email id"
            />
            {/* {formik.errors.userPassword && <div className="text-red-500 ">{formik.errors.userPassword}</div>} */}

            <input id="otp" name='otp' onChange={formik.handleChange}
            className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${formik.errors.otp ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5`}
            type="number"
            placeholder="Enter 6 digit OTP"
            />
            {/* {formik.errors.otp && <div className="text-red-500 ">{formik.errors.otp}</div>} */}

            {/* Submit button */}
          <button
              type='submit'
              className="mt-5 tracking-wide font-semibold bg-green-800 text-gray-100 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              disabled={formik.isSubmitting} // Disable the button while submitting
          >
              {formik.isSubmitting ? (
                  // Show loading spinner if submitting
                  <span>Loading...</span>
              ) : (
                  // Show "Login" text if not submitting
                  <span>Login</span>
              )}
          </button>
        </form>
    </div>
    </>
  )
}

export default Login