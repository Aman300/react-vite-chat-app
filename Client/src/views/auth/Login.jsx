import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import { loginRoute } from '../../utils/APIRoutes';
import { useGoogleLogin } from '@react-oauth/google';

const validate = values => {
  const errors = {};

  if(!values.name){
    errors.password = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Phone no must be 6 digit';
  }

  return errors;
};
function Login() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password:'',
    },
    validate,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Send a request to the server to authenticate the user
        const response = await axios.post(loginRoute, {
          name: values.name,
          email: values.email,
          password: values.password,
        });

        console.log(response.data)
        const token = response.data.data.token ? true : false;

        // Store the token in localStorage
        localStorage.setItem('token', token);

        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.data));
        // localStorage.setItem("room", 99)

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

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try{

        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",{
          headers:{
            Authorization: `Bearer ${response.access_token}`
          }
        })
        try {
          // Send a request to the server to authenticate the user
          const resPonse = await axios.post(loginRoute, {
            name: res.name,
            email: res.email,
            password: res.sub,
            profile: req.picture
          });
  
          console.log(resPonse.data)
          const token = resPonse.data.data.token ? true : false;
  
          // Store the token in localStorage
          localStorage.setItem('token', token);
  
          // Store user data in localStorage
          localStorage.setItem('user', JSON.stringify(resPonse.data.data));
  
          // Display success message
          toast.success(resPonse.data.message);
  
          navigate("/")
  
        } catch (error) {
          // Handle any errors
          console.error('Login failed:', error);
          toast.error(error.resPonse.data.message);
        }

      }catch(e){
        console.log(e)
      }
    }
  });

  return (
    <>
    <div className='h-screen p-5'>
      <div className='flex justify-center items-center h-[140px]'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-20 text-green-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
        </svg>
        <h2 className='font-semibold text-2xl'><span className='text-green-500 '>Our</span>Chat</h2>
      </div>

            <div className="my-12 border-b text-center">
              <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                sign in with google
              </div>
            </div>
            <div className="flex flex-col items-center">
              <button onClick={() => login()} className="w-full max-w-xs font-bold shadow-sm rounded-full py-3 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                <div className="bg-white p-2 rounded-full">
                  <svg className="w-4" viewBox="0 0 533.5 544.3">
                    <path
                      d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                      fill="#4285f4"
                    />
                    <path
                      d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                      fill="#34a853"
                    />
                    <path
                      d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                      fill="#fbbc04"
                    />
                    <path
                      d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                      fill="#ea4335"
                    />
                  </svg>
                </div>
                <span className="ml-4">Sign In with Google</span>
              </button>
            </div>

       <form onSubmit={formik.handleSubmit}>

       <input id="name" name='name' onChange={formik.handleChange}
            className={`w-full px-8 py-4 rounded-full font-medium bg-gray-100 border ${formik.errors.name ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5`}
            type="text"
            placeholder="Enter your name"
            />
          {/*  */}
            <input id="email" name='email' onChange={formik.handleChange}
            className={`w-full px-8 py-4 rounded-full font-medium bg-gray-100 border ${formik.errors.email ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5`}
            type="email"
            placeholder="Enter your email id"
            />
            {/* {formik.errors.userPassword && <div className="text-red-500 ">{formik.errors.userPassword}</div>} */}

            <input id="password" name='password' onChange={formik.handleChange}
            className={`w-full px-8 py-4 rounded-full font-medium bg-gray-100 border ${formik.errors.password ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5`}
            type="text"
            placeholder="Enter your password"
            />
            {/* {formik.errors.password && <div className="text-red-500 ">{formik.errors.password}</div>} */}

            {/* Submit button */}
          <button
              type='submit'
              className="mt-5 tracking-wide font-semibold bg-green-800 text-gray-100 w-full py-4 rounded-full hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
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
        <div className='text-center mt-5 hover:text-green-500'>
          <Link to="/signup" >Don't have an accout? Signup</Link>
         </div>
      </div>
    </>
  )
}

export default Login