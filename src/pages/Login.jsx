import { use, useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Login = () => {
    const [input, SetInput] = useState({
    email: '',
    password: ''
  });

  const HandleInputChange = (eventVal) => {
    const { name, value } = eventVal;
    SetInput(values => ({ ...values, [name]: value }))
  }

  const HandleSubmit = () => {
    const { email, password } = input;
    if (!email || !password) return toast('Please enter valid input');
    SetInput({ email: '', password: '' });
    toast("Account Login");
  }
  const navigate = useNavigate();

  return (
     <div className=' bg-[#0f0f0f]  h-screen m-auto ml-21  p-2  '>
      <div className='  w-full md:w-[50%] lg:w-[35%] xl:w-[40%]  m-auto  h-[600px]  py-20 '>
        <h1 className=' text-3xl   text-center text-white mt-5 font-bold '><b>Welcome Back....</b></h1>
        <div className=" flex flex-col gap-4 mt-10 ">
          <p className=' text-white font-semibold px-2 '>Email</p>
          <input type="email" placeholder='Email' className=" border-1 border-gray-400 shadow rounded-md outline-none border-none py-2 text-black px-3 bg-white" value={input.email} onChange={(e) => HandleInputChange(e.target)} name="email" />
          <p className=' text-white font-semibold px-2 '>Password</p>
          <input type="password" placeholder='Passowrd' className=" border-1 border-gray-400 shadow rounded-md outline-none border-none py-2 text-black px-3 bg-white" value={input.password} onChange={(e) => HandleInputChange(e.target)} name="password" />
          <button onClick={HandleSubmit} className=" bg-red-600 py-2 mt-4 text-lg font-bold rounded-md text-white ">Login</button>
          <p onClick={()=> navigate('/signin')} className=" underline  text-blue-800 text-end  mt-3 ">Don't have an account? Sign in</p>
        </div>
      </div>
    </div>
  )
}

export default Login
