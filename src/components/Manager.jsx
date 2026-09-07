import React, { useRef, useState, useEffect } from 'react'

const Manager = () => {
    const ref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        let password = localStorage.getItem("password");
        if (password) {
            setpasswordArray(JSON.parse(password))
        }
    }, [])



    const showpassword = (params) => {
        alert("show the password")
        if (ref.current.src.includes("public/eyeclose.png")) {
            ref.current.src = "public/eyeopen.gif"
        }
        else {
            ref.current.src = "public/eyeclose.png"
        }
    }

    const savepassword = () => {
        setpasswordArray([...passwordArray, form])
        localStorage.setItem("password", JSON.stringify([...passwordArray, form]))
        console.log([...passwordArray, form])

    }

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }



    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full
      bg-white
      bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)]
      bg-[size:14px_24px]">

                <div className="absolute left-0 right-0 top-0 -z-10
        m-auto h-[310px] w-[310px] rounded-full
        bg-fuchsia-400 opacity-20 blur-[100px]">
                </div>
            </div>

            <div className="mx-auto text-green-800  max-w-4xl mt-1 rounded-2xl text-black p-4">

                <h1 className="text-center text-2xl font-bold">
                    Passop
                </h1>

                <p className="text-center font-extrabold ">
                    your own password
                </p>

                <div className="text-black flex flex-col p-4 gap-7">

                    {/* input1 site*/}
                    <input value={form.site} onChange={handlechange} placeholder='Enter website url'
                        className="border border-green-700 w-full rounded-full px-4 py-2 focus:bg-white"
                        type="text"
                        name="site"
                        id=""
                    />

                    <div className="flex gap-3">

                        {/* input2 username */}
                        <input value={form.username} onChange={handlechange} placeholder='Enter Username'
                            className="border border-green-700 w-full rounded-full px-4 py-2 focus:bg-white"
                            type="text" name="username"
                        />
                        <div className="relative">

                            {/* input3 password */}
                            <input value={form.password} onChange={handlechange} placeholder='Enter Password'
                                className="border border-green-700 w-full rounded-full px-4 py-2 focus:bg-white"
                                type="text" name="password"
                            />
                            <span className='absolute right-3 top-1 cursor-pointer'
                                onClick={showpassword}>
                                <img ref={ref} className='p-2' width={35}
                                    src="public/eyeopen.gif" alt="" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savepassword}
                        className="self-center flex items-center gap-1 font-bold
                    bg-green-600 rounded-full px-8 py-2
                    hover:cursor-pointer hover:bg-green-500
                    border-4 ">
                        <span class="material-symbols-outlined">key</span>
                        Add password
                    </button>
                </div>
                <div className="password">
                    <h1 className=' text-2xl font-bold py-4'>Your Password</h1>
                    {passwordArray.length === 0 && <div> No password to show </div>}
                    {passwordArray.length != 0 && (<table className="table-auto w-full border-4  ">
                        <thead className=' bg-green-800 text-white'>
                            <tr>
                                <th className='py-1'>Site </th>
                                <th className='py-1'>Username</th>
                                <th className='py-1'>password</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-200'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className=' py-2 border-3 text-center w-3'><a href="http://"></a>{item.site}</td>
                                    <td className=' py-2 border-3 text-center w-3'>{item.username}</td>
                                    <td className=' py-2 border-3 text-center w-3'>{item.password}</td>
                                </tr>
                            })
                            }
                        </tbody>
                    </table>
                    )}
                </div>
            </div >
        </>
    )
}

export default Manager