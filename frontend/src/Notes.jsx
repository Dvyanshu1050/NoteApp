import { useEffect, useState } from "react"
import axios from "axios"

const Notes = () => {

    // input states
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")

    // all notes
    const [notes, setNotes] = useState([])

    // edit mode
    const [editId, setEditId] = useState(null)

    // status state
    const [status, setStatus] = useState({})




    // get notes
    const getNotes = async () => {

        try {

            const res = await axios.get(
                "http://localhost:3000/all-notes"
            )

            setNotes(res.data)

        } catch (error) {
            console.log(error)
        }

    }




    // page load
    useEffect(() => {
        getNotes()
    }, [])




    // add note
    const addNote = async () => {

        if (!title || !desc) {
            return alert("fill all fields")
        }

        try {

            await axios.post(
                "http://localhost:3000/add-notes",
                {
                    title,
                    desc
                }
            )

            getNotes()

            setTitle("")
            setDesc("")

        } catch (error) {
            console.log(error)
        }

    }




    // delete note
    const deleteNote = async (id) => {

        try {

            await axios.delete(
                `http://localhost:3000/delete-note/${id}`
            )

            getNotes()

        } catch (error) {
            console.log(error)
        }

    }




    // edit note
    const editNote = (item) => {

        setTitle(item.title)
        setDesc(item.desc)

        setEditId(item.id)

    }




    // update note
    const updateNote = async () => {

        try {

            await axios.put(
                `http://localhost:3000/edit-note/${editId}`,
                {
                    title,
                    desc
                }
            )

            getNotes()

            setTitle("")
            setDesc("")

            setEditId(null)

        } catch (error) {
            console.log(error)
        }

    }




    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-fuchsia-100 p-6">

            {/* heading */}
            <div className="text-center mb-10">

                <h1 className="text-5xl font-bold text-pink-600 mb-3">
                    ✨ Dreamy Notes
                </h1>

                <p className="text-gray-600 text-lg">
                    Write your beautiful thoughts 💖
                </p>

            </div>




            {/* form */}
            <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-lg p-8 rounded-[40px] shadow-2xl border border-pink-200">

                <input
                    type="text"
                    placeholder="Enter cute title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-4 rounded-2xl outline-none border-2 border-pink-200 focus:border-pink-500 text-lg mb-5 bg-pink-50"
                />



                <textarea
                    placeholder="Write your magical thoughts..."
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="w-full h-40 p-4 rounded-2xl outline-none border-2 border-pink-200 focus:border-pink-500 text-lg resize-none bg-pink-50"
                ></textarea>



                <div className="flex justify-center mt-6">

                    {
                        editId ? (

                            <button
                                onClick={updateNote}
                                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition-all duration-300"
                            >
                                💫 Update Note
                            </button>

                        ) : (

                            <button
                                onClick={addNote}
                                className="bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition-all duration-300"
                            >
                                💖 Add Note
                            </button>

                        )
                    }

                </div>

            </div>




            {/* notes */}
            <div className="max-w-6xl mx-auto mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {
                    notes.map((item) => (

                        <div
                            key={item.id}
                            className={`

                            ${status[item.id] === "pending"
                                    ? "bg-yellow-100"
                                    : status[item.id] === "fulfilled"
                                        ? "bg-green-100"
                                        : status[item.id] === "rejected"
                                            ? "bg-red-100"
                                            : "bg-white/80"
                                }

                            backdrop-blur-lg 
                            rounded-[35px] 
                            p-6 
                            shadow-xl 
                            border 
                            border-pink-100 
                            hover:-translate-y-2 
                            hover:shadow-pink-200 
                            transition-all 
                            duration-300
                            
                            `}
                        >


                            {/* status text */}

                            <div className="mb-3">

                                {
                                    status[item.id] === "pending" && (
                                        <p className="text-yellow-700 font-semibold">
                                            🟡 Pending
                                        </p>
                                    )
                                }

                                {
                                    status[item.id] === "fulfilled" && (
                                        <p className="text-green-700 font-semibold">
                                            🟢 Fulfilled
                                        </p>
                                    )
                                }

                                {
                                    status[item.id] === "rejected" && (
                                        <p className="text-red-700 font-semibold">
                                            🔴 Rejected
                                        </p>
                                    )
                                }

                            </div>




                            <h2 className="text-2xl font-bold text-pink-600 mb-3 break-words">
                                {item.title}
                            </h2>

                            <p className="text-gray-600 leading-7 break-words">
                                {item.desc}
                            </p>




                            {/* edit delete */}

                            <div className="flex gap-4 mt-8">

                                <button
                                    onClick={() => editNote(item)}
                                    className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-2xl font-semibold transition-all duration-300"
                                >
                                    ✏ Edit
                                </button>



                                <button
                                    onClick={() => deleteNote(item.id)}
                                    className="flex-1 bg-rose-400 hover:bg-rose-500 text-white py-3 rounded-2xl font-semibold transition-all duration-300"
                                >
                                    🗑 Delete
                                </button>

                            </div>




                            {/* status buttons */}

                            <div className="flex gap-2 mt-5 flex-wrap">

                                <button
                                    onClick={() =>
                                        setStatus({
                                            ...status,
                                            [item.id]: "pending"
                                        })
                                    }
                                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-xl text-sm font-semibold"
                                >
                                    Pending
                                </button>




                                <button
                                    onClick={() =>
                                        setStatus({
                                            ...status,
                                            [item.id]: "fulfilled"
                                        })
                                    }
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-semibold"
                                >
                                    Fulfilled
                                </button>




                                <button
                                    onClick={() =>
                                        setStatus({
                                            ...status,
                                            [item.id]: "rejected"
                                        })
                                    }
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-semibold"
                                >
                                    Rejected
                                </button>

                            </div>

                        </div>

                    ))
                }

            </div>

        </div>
    )

}

export default Notes