
import { IoMdAdd } from "react-icons/io";
import { themeHolderTemp } from "../../feature/themeSlice";
import { useEffect, useState } from "react";
import { FileInput, Button, Modal } from 'flowbite-react';
import { userdataTemp } from "../../feature/data/userdataSlice";
import { InsertNoteThunk } from "../../feature/noteSlice";
import { useSelector, useDispatch } from 'react-redux';
import { isNoteDataInsertedTemp, isNoteDataDeletedTemp } from "../../feature/noteSlice";
import { ShowToast } from "../../components/toaster";
import { ClearIsNoteDataInsertedState, ClearIsNoteDataDeletedState } from "../../feature/noteSlice";
import { GetNoteThunk } from "../../feature/noteSlice";
import { noteDataTemp } from "../../feature/noteSlice";
import { FaRegTrashAlt } from "react-icons/fa";
import { RiEdit2Line } from "react-icons/ri";
import { DeleteNoteThunk } from "../../feature/noteSlice";

export const Note = () => {

    const dispatch = useDispatch();
    const themeHolder = useSelector(themeHolderTemp);
    const [openInsertNoteModal, setOpenInsertNoteModal] = useState(false);

    const userdata = useSelector(userdataTemp);
    if (Object.keys(userdata).length != 0) {
        var username = userdata.username;
    }

    const [noteData, setNoteData] = useState({
        noteSubject: 'english',
        noteTitle: '',
        note: '',
    })

    const handleNoteDataChangeFunc = (e) => {
        const { name, value } = e.target;
        setNoteData({ ...noteData, [name]: value });
    };

    const date = new Date();
    const time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const fullDate = date.toDateString() + ' / ' + time;;

    const handleNoteSubmit = (e) => {
        e.preventDefault();

        const noteDataTemp = {
            noteuser: username,
            noteSubject: noteData.noteSubject,
            noteTitle: noteData.noteTitle,
            note: noteData.note,
            notedate: fullDate,
        }

        dispatch(InsertNoteThunk({ noteDataTemp }));
    }

    const isNoteDataInserted = useSelector(isNoteDataInsertedTemp);


    useEffect(() => {
        if (isNoteDataInserted === true) {
            ShowToast('Note has been added', 'success');

            setNoteData({ // clear input fields
                noteSubject: 'english',
                noteTitle: '',
                note: '',
            });

            setOpenInsertNoteModal(false); // to close the modal
            dispatch(ClearIsNoteDataInsertedState());

            dispatch(GetNoteThunk(username)); // passed username to get only the note with name column

        }
        if (isNoteDataInserted === false) {
            ShowToast('Note failed to added', 'error');
            dispatch(ClearIsNoteDataInsertedState());
        }

    }, [isNoteDataInserted]);

    const gotNoteData = useSelector(noteDataTemp);

    const NoteColorFunc = (usernote) => {
        if (usernote === 'english') return 'bg-blue-300';
        if (usernote === 'filipino') return 'bg-violet-300';
        if (usernote === 'mathematics') return 'bg-green-300';
        if (usernote === 'social science') return 'bg-pink-300';
        if (usernote === 'humanities') return 'bg-yellow-300';
        if (usernote === 'communication skills') return 'bg-orange-300';
        if (usernote === 'ict') return 'bg-red-300';
    }

    const DeleteNoteFunc = (noteID) => {
        dispatch(DeleteNoteThunk(noteID)); //passed id to determine which note to delete
    }

    const isNoteDataDeleted = useSelector(isNoteDataDeletedTemp);

    console.log(isNoteDataDeleted);

    useEffect(() => {
        if (isNoteDataDeleted === true) {

            dispatch(GetNoteThunk(username));
            dispatch(ClearIsNoteDataDeletedState());
        }
        if (isNoteDataDeleted === false) {
            ShowToast('note failed deleted', 'error');
            dispatch(ClearIsNoteDataDeletedState());
        }

    }, [isNoteDataDeleted])

    const GetNoteDataBasedOnSubjectFunc = (noteSubject) => {
         dispatch()
    }


    return (
        <div className=" h-[90%] w-[69rem] max-w-[95%]">
            <section className="h-[8%] w-full flex items-center justify-between">
                <div className="h-full w-full overflow-scroll noScrollbar">
                    <ul className="flex h-full text-sm text-gray-300 ">
                        <li className={`${themeHolder.colortxt1} h-full w-fit px-5 hover:border-b border-yellow-500 cursor-pointer flex items-center justify-center`}>English</li>
                        <li className={`${themeHolder.colortxt1} h-full w-fit px-5 hover:border-b border-yellow-500 cursor-pointer flex items-center justify-center`}>English</li>
                        <li className={`${themeHolder.colortxt1} h-full w-fit px-5 hover:border-b border-yellow-500 cursor-pointer flex items-center justify-center`}>Filipino</li>
                        <li className={`${themeHolder.colortxt1} h-full w-fit px-5 hover:border-b border-yellow-500 cursor-pointer flex items-center justify-center`}>Mathematics</li>
                        <li className={`${themeHolder.colortxt1} h-full w-fit px-5 hover:border-b border-yellow-500 cursor-pointer flex items-center justify-center`}>Science</li>
                        <li className={`${themeHolder.colortxt1} h-full w-fit px-5 hover:border-b border-yellow-500 cursor-pointer flex items-center justify-center`}>Social Science</li>
                        <li className={`${themeHolder.colortxt1} h-full w-fit px-5 hover:border-b border-yellow-500 cursor-pointer flex items-center justify-center`}>Humanities</li>
                        <li className={`${themeHolder.colortxt1} h-full w-fit px-5 hover:border-b border-yellow-500 cursor-pointer flex items-center justify-center`}>Communication Skills </li>
                        <li className={`${themeHolder.colortxt1} h-full w-fit px-5 hover:border-b border-yellow-500 cursor-pointer flex items-center justify-center`}>ICT</li>
                    </ul>
                </div>

                <Button onClick={() => { setOpenInsertNoteModal(true) }} gradientDuoTone="purpleToBlue">
                    <IoMdAdd className="text-xl" /> <span className="ml-1">add</span>
                </Button>
            </section>

            <section className="h-[92%] w-full pt-3 overflow-scroll noScrollbar flex flex-wrap content-start gap-4  ">
                {

                    gotNoteData.map((item) => (

                        <div key={item.noteID} className={`${NoteColorFunc(item.notesubject)} relative h-[15rem] w-[15rem] overflow-scroll noScrollbar  rounded-lg p-2`}>
                            <div >
                                <p className="text-gray-600 text-sm">{item.notedate}</p>
                            </div>


                            <FaRegTrashAlt onClick={() => DeleteNoteFunc(item.noteID)} className="absolute h-fit w-fit top-2 right-2 flex flex-col text-xl gap-y-2 text-red-500 hover:bg-white cursor-pointer" />


                            <div>
                                <p className="text-gray-800 text-2xl font-semibold ">{item.notetitle}</p>

                                <p className="text-gray-800 text-md">{item.actualnote}</p>
                            </div>

                        </div>

                    ))


                }
            </section>


            {/* modal section */}
            <Modal size="md" dismissible show={openInsertNoteModal} onClose={() => setOpenInsertNoteModal(false)}>
                <form onSubmit={handleNoteSubmit} action="">
                    <div className='space-y-8 bg-gray-700 rounded-lg p-5'>
                        <h3 className="text-xl font-medium text-gray-300 dark:text-white">Create Note</h3>

                        <div className="flex flex-col items-start gap-y-2">

                            <div className="w-full">
                                <label htmlFor="subject" className="text-lg text-gray-300">Choose a subject:</label>
                                <select
                                    onChange={handleNoteDataChangeFunc}
                                    value={noteData.noteSubject}
                                    id="noteSubject"
                                    name="noteSubject"
                                    className="bg-gray-600 rounded-sm w-full outline-none border-none p-2 text-gray-300 text-md ">
                                    <option value="english">English</option>
                                    <option value="filipino">Filipino</option>
                                    <option value="mathematics">Mathematics</option>
                                    <option value="social science">Social Science</option>
                                    <option value="humanities">Humanities</option>
                                    <option value="communication skills">Communication Skills</option>
                                    <option value="ict">ICT</option>
                                </select>
                            </div>

                            <div className="w-full">
                                <label htmlFor="title" className="text-lg text-gray-300">Enter note title:</label>
                                <input onChange={handleNoteDataChangeFunc} value={noteData.noteTitle} type="text" name="noteTitle" id="noteTitle" className="bg-gray-600 rounded-sm w-full outline-none border-none p-2 text-gray-300 text-md " placeholder="Note Title:" />
                            </div>

                            <div className="w-full flex flex-col">
                                <textarea onChange={handleNoteDataChangeFunc} value={noteData.note}
                                    name="note" id="note" className="h-[8rem] w-full bg-gray-600 rounded-sm outline-none border-none p-2 text-gray-300 text-md " placeholder="Enter your thought..."></textarea>
                            </div>

                        </div>

                        <div className='flex flex-row gap-x-3'>
                            <Button className='w-fit rounded-md' type='submit' gradientMonochrome="cyan">submit</Button>

                            <Button className='w-fit rounded-md' onClick={() => setOpenInsertNoteModal(false)} gradientMonochrome="success">close</Button>
                        </div>
                    </div>
                </form>
            </Modal>

        </div>
    )
}