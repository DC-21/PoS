import Axios from 'axios'

const Login = () => {
    return (
        <div className='w-full flex justify-center items-center h-screen'>
            <div className='items-center mx-auto justify-center bg-gray-100 border-2 border-bg-blue-400 rounded-[10px] w-[350px] h-[400px] bg-white'>
                <p className='mt-5 text-center text-2xl'>Login Please</p>
                <div className='w-full flex flex-col items-center justify-center h-auto'>
                    <div className='w-full flex flex-col justify-center items-center'>
                        <label className='mt-4' htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            className='p-2 mb-4 mt-4 rounded'
                        />
                    </div>
                    <div className='w-full flex flex-col justify-center items-center'>
                        <label className='mt-4' htmlFor="username">Username</label>
                        <input
                            type="password"
                            id="password"
                            className='p-2 mb-4 mt-4 rounded'
                        />
                    </div>
                    <div className='w-full flex justify-center'>
                        <button className='items-center w-[100px] p-2 mt-2 mb-2 rounded text-white bg-blue-800'>Login</button>
                    </div>
                    <div className='w-full flex gap-4 mt-3 mb-3 justify-center'>
                        <p>Forgot Password?</p>
                        <p>Create account</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login