import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';



const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()

    

    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        let password = localStorage.getItem("password");
        if (password) {
            setpasswordArray(JSON.parse(password))
        }
    }, [])

    // copy karne wala function

    const copytext = async (text) => {
        await navigator.clipboard.writeText(text)

        // copy toast
        toast('Copied successfully!', {
            position: "top-right",
            autoClose: 2000,

            pauseOnHover: false,
            closeButton: true,
            theme: "light",
        })
    }

    const showpassword = (params) => {
        passwordRef.current.type = "text"

        if (ref.current.src.includes("public/eyeclose.png")) {

            ref.current.src = "public/eyeopen.gif"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "public/eyeclose.png"
            passwordRef.current.type = "text"
        }
    }

    const savepassword = () => {

        if (form.site.length >0  && form.username.length >0  && form.password.length > 0) {

            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])

            localStorage.setItem("password", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log([...passwordArray, form])
            setform({ site: "", username: "", password: "" })

            toast('password saved successfully!', {
                position: "top-right",
                autoClose: 2000,
                pauseOnHover: false,
                closeButton: true,
                theme: "light",
            });
        }
        
        else {
            toast('please fill all details then only u can save your password', {
                position: "top-right",
                autoClose: 2000,
                pauseOnHover: false,
                closeButton: true,
                theme: "dark",
            })
        }
    }

    const deletepassword = (id) => {
        console.log("deleting pass with id ", id)

        // alert delete karne ke liye
        let c = confirm("are you sure u want to delete ")
        if (c) {


            setpasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("password", JSON.stringify(passwordArray.filter(item => item.id !== id)))

            toast('deleted successfully!', {
                position: "top-right",
                autoClose: 2000,

                pauseOnHover: false,
                closeButton: true,
                theme: "dark",
            })

        }
    }

    const editpassword = (id) => {
        console.log("editing password with id ", id)
        setform(passwordArray.filter(i => i.id === id)[0])

        setpasswordArray(passwordArray.filter(item => item.id !== id))
        // localStorage.setItem("password", JSON.stringify([...passwordArray, form]))
        // console.log([...passwordArray, form])

    }



    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }



    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}

                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
                transition={Bounce}
            />




            <div className="absolute inset-0 -z-10 h-full w-full
      bg-white
      bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)]
      bg-[size:14px_24px]">

                <div className="absolute left-0 right-0 top-0 -z-10
        m-auto h-[310px] w-[310px] rounded-full
        bg-fuchsia-400 opacity-20 blur-[100px]">
                </div>
            </div>

<div className="mx-auto text-green-800 w-full max-w-4xl mt-1 rounded-2xl text-black p-3 sm:p-4 md:mycontainer min-h-[89vh]">
                <h1 className="text-center text-xl sm:text-2xl font-bold">
                    Passop
                </h1>

                <p className="text-center font-extrabold ">
                    your own password
                </p>

<div className="text-black flex flex-col p-3 sm:p-4 gap-5 sm:gap-7">
                    {/* input1 site*/}
                    <input value={form.site} onChange={handlechange} placeholder='Enter website url'
                        className=" border border-green-700 w-full rounded-full px-4 py-2 focus:bg-white"
                        type="text"
                        name="site"
                        id="site"
                    />

                    <div className="flex md:flex-row flex-col gap-3">

                        {/* input2 username */}
                        <input value={form.username} onChange={handlechange} placeholder='Enter Username'
                            className="border border-green-700 w-full rounded-full px-4 py-2 focus:bg-white"
                            type="text" name="username"
                            id="username"
                        />
                        <div className="relative">

                            {/* input3 password */}
                            <input ref={passwordRef} value={form.password} onChange={handlechange} placeholder='Enter Password'
                                className="border border-green-700 w-full rounded-full px-4 py-2 focus:bg-white"
                                type="password" name="password"
                                id="password"
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
bg-green-600 rounded-full px-5 sm:px-8 py-2
                    hover:cursor-pointer hover:bg-green-500
                    border-4 ">
                        <span class="material-symbols-outlined">key</span>
                        Save Password
                    </button>
                </div>
                <div className="password pb-24">
                   <h1 className='text-xl sm:text-2xl font-bold py-4'>Your Password</h1>
                    {passwordArray.length === 0 && <div> No password to show </div>}

                    {passwordArray.length != 0 && 
                    
                    // (<table className="table-auto w-full border-4  ">
                    (<div className="overflow-x-auto w-full">
    <table className="table-auto w-full min-w-[600px] border-4">
                        <thead className=' bg-green-800 text-white'>
                            <tr>
                                <th className='py-1'>Site </th>
                                <th className='py-1'>Username</th>
                                <th className='py-1'>password</th>
                                <th className='py-1'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-200'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>

                                    {/* column 1 */}

                                    <td className='py-2 border-3  cursor-pointer text-center w-3'><a href={item.site}
                                        target='_blank'>{item.site} </a>
                                        <img
                                            src="/copybutton.webp"
                                            onClick={() => copytext(item.site)}
                                            className=" w-5 h-5  cursor-pointer inline-block ml-2 align-middle hover:bg-slate-200" />
                                    </td>

                                    {/* column 2 */}

                                    <td className=' py-2 border-3 cursor-pointer text-center w-3'>
                                        {item.username}
                                        <img
                                            src="/copybutton.webp"
                                            onClick={() => copytext(item.username)}
                                            className="w-5 h-5  cursor-pointer inline-block ml-2 align-middle hover:bg-slate-200" />
                                    </td>

                                    {/* column 3 */}

                                    <td className=' py-2 border-3  cursor-pointer text-center w-3'>
                                        {"*".repeat(item.password.length)}
                                       
                                    </td>

                                    {/* column 4 */}

                                    <td className=' py-2 border-3 cursor-pointer  text-center w-3'>

                                        {/* edit button */}

                                        <img
                                            src="/edit.png"

                                            onClick={() => { editpassword(item.id) }}
                                            className="w-5 h-5  cursor-pointer inline-block ml-2 mx-5 align-middle hover:bg-slate-200" />

                                        {/* delete button */}

                                        <img
                                            src="/delete.png"
                                            onClick={() => { deletepassword(item.id) }}

                                            className="w-5 h-5  cursor-pointer inline-block ml-2 mx-3  align-middle hover:bg-slate-200" />


                                    </td>

                                </tr>
                            })
                            }
                        </tbody>
</table>
</div>
)}
                </div>
            </div >
        </>
    )
}

export default Manager