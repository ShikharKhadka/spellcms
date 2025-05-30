import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { credentialI, Inputs } from '../../component/login/interface';
import { useForm } from 'react-hook-form';
import Textfiled from '../../component/textfiled';
import useInput from '../../hooks/input';
import Button from '../../component/button/button';

const Login = () => {
  const [credential, setCredential] = useState<credentialI>({});
  const [error, setError] = useState<string | null>(null);
  const email = "shikharkhadka@gmail.com"
  const password = "password";
  const input = useInput<Inputs>();
  const navigate = useNavigate();

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCredential({ ...credential, email: value });
  }

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCredential({ ...credential, password: value });
  }

  const onClick = () => {
    if (credential.email == email && credential.password == password) {
      localStorage.setItem("token", "This is Token");
      navigate("/blog");
    }
    else {
      setError("Incorrect Email or Password")
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={input.handleSubmit(onClick)} className="w-full max-w-sm p-4 bg-white shadow rounded">
        <div className="text-2xl font-semibold mb-4 text-center ">Login</div>
        <Textfiled fullWidth={true} onchange={onEmailChange} placeholder='Email' required={true} validationName='email' input={input} value={credential.email} />
        <Textfiled fullWidth={true} onchange={onPasswordChange} placeholder='Password' required={true} validationName='password' input={input} value={credential.password} />
        <div className="flex justify-center">
          <Button title="Login" />
        </div>
        {error && <div className="text-red-500 mt-2 text-sm">{error}</div>}
      </form>
    </div>
  );
}

export default Login
