import {useState} from 'react';
import '../Forms.css'

function Login(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleLogin = async(e)=>{
        e.preventDefault();
        const response = await fetch('https://workout-app-server-five.vercel.app/api/login',
        {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        },
        )
        const data =  await response.json();
        console.log(data)
        if (data.token){
            localStorage.setItem("token",data.token);
            window.location.href = "/dashboard"
        }
        else{
            alert("Login Failed")
        }
     
    }

    return(
        <div className="main">
            <a href="/"><button>Home</button></a>
            <a href="/register"><button>Register</button></a>
            <form className="form">
                <p className="form-title">Login</p>
                
                <div className="input-container">
                    <input type="email" name="email" id="" value={email} required onChange={(e) => {setEmail(e.target.value)}} placeholder="Email"/>
                    <span>
                <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                </svg>
            </span>
                </div>
                <div className="input-container">
                <input type="password" name="password" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Password" />
                    <span>
                <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                </svg>
            </span>
                </div>

                <button className="submit" type="submit" onClick={handleLogin}>Login</button>
            </form>
        </div>
    )
}



export default Login;