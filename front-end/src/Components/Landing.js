import React from 'react'
import {useState} from 'react'
import axios from 'axios';

export const Landing = () => {
  const candidateUser = "Candidate"
  const candidatePassword = "123"
  const adminUser = "Admin"
  const adminPassword = "123"

  const [message, setMessage] = useState(""); // Alert

  const [userInput, setUserInput] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const checkLogin = () => {
    if(userInput && userPassword) {
        if(userInput === adminUser && userPassword === adminPassword) {
            axios.post("http://localhost:2000/api/setrole",
            {
                role: adminUser
            }
            ).then((res) => {
                if(res.status === 200) {
                    window.location.href="/home"
                }
            })
        }
        else if(userInput === candidateUser && userPassword === candidatePassword) {
            axios.post("http://localhost:2000/api/setrole",
            {
                role: candidateUser
            }
            ).then((res) => {
                if(res.status === 200) {
                    window.location.href="/home"
                }
            })
        }
        else {
            setMessage("User doesn't exist!");
            setTimeout(() => {
                setMessage("");
            },2000)
        }
    }
    else {
        setMessage("Missing parameters!");
        setTimeout(() => {
            setMessage("");
        },2000)
    }
  }

  return (
    <div className='w-full h-screen bg-gradient-to-tr from-slate-200 to-white'>
        {message && (<div className='absolute top-10 left-1/2 -translate-x-1/2 w-2/6 h-10 bg-red-400 rounded-md p-2 text-white font-medium'>{message}</div>)}
       <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 rounded-lg h-80 bg-gray-200'>
            <h1 className='w-full text-lg tracking-tight mt-2 font-medium text-center'>Login</h1>
            <div className='mt-8 flex flex-col gap-2 w-5/6 m-auto'>
                <label className='font-medium text-sm text-gray-600'>Username</label>
                <input onChange={(e) => setUserInput(e.target.value)} className='bg-gray-300 p-2 rounded-md text-sm' placeholder='Admin'/>
                <label className='font-medium text-sm text-gray-600'>Password</label>
                <input onChange={(e) => setUserPassword(e.target.value)} type = "password" className='bg-gray-300 p-2 rounded-md text-sm' placeholder='Password'/>
                <button onClick={checkLogin} className='w-full p-2 mt-4 bg-gray-100 rounded-md font-semibold text-gray-500 hover:text-gray-700 hover:bg-white transition-all'>Login</button>
            </div>
       </div>
    </div>
  )
}
