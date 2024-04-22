
import { Button, Modal } from "flowbite-react";

import { ShowToast } from "../../components/toaster";
import React, { useEffect, useState } from "react";
import { themeHolderTemp } from "../../feature/themeSlice";
import { useSelector, useDispatch } from "react-redux";
import { userdataTemp } from "../../feature/data/userdataSlice";
import { InsertFlashcardThunk } from "../../feature/flashcardSlice";
import { clearIsFlashcardDataInserted } from "../../feature/flashcardSlice";
import { isFlashcardDataInsertedTemp } from "../../feature/flashcardSlice";
import { GetFlashcardThunk } from "../../feature/flashcardSlice";
import { flashcardDataTemp } from "../../feature/flashcardSlice";
import { InsertFlashCardItemThunk } from "../../feature/flashcardSlice";
import { isFlashcardItemInsertedTemp } from "../../feature/flashcardSlice";
import { clearIsFlashcardItemInserted } from "../../feature/flashcardSlice";
import { GetFlashcardItemThunk } from "../../feature/flashcardSlice";
import { flashcardItemTemp } from "../../feature/flashcardSlice";
import { IoMdAddCircleOutline } from "react-icons/io";
import { LuBookOpen } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Tooltip } from "flowbite-react";
import { MdOutlineArrowBack } from "react-icons/md";
import { DeleteFlashCardDataThunk } from "../../feature/flashcardSlice";
import { clearIsFlashcardDataDeleted } from "../../feature/flashcardSlice";
import { isFlashcardDataDeletedTemp } from "../../feature/flashcardSlice";
import { DeleteFlashCardItemByIDThunk } from "../../feature/flashcardSlice";
import { GrCaretPrevious } from "react-icons/gr";
import { GrCaretNext } from "react-icons/gr";
export const FlashCard = () => {

    const dispatch = useDispatch();
    const themeHolder = useSelector(themeHolderTemp);
    const [openAddFlashcardModal, setOpenAddFlashcardModal] = useState(false);
    const [openAddFlashcardItemModal, setOpenAddFlashcardItemModal] = useState(false);

    const userdata = useSelector(userdataTemp);
    if (Object.keys(userdata).length != 0) {
        var username = userdata.username;
    }

    const [flashcardData, setFlashcardData] = useState({
        flashcardSubject: 'english',
        flashcardTitle: '',
    });

    const handleFlashcardDataChangeFunc = (e) => {
        const { name, value } = e.target;
        setFlashcardData({ ...flashcardData, [name]: value });
    };

    const handleFlashcardSubmit = (e) => {
        e.preventDefault();

        const flashcardDataTemp = {
            flashcardUser: username,
            flashcardSubject: flashcardData.flashcardSubject,
            flashcardTitle: flashcardData.flashcardTitle,
        }

        dispatch(InsertFlashcardThunk({ flashcardDataTemp }))
    }
    const isFlashcardDataInserted = useSelector(isFlashcardDataInsertedTemp);

    useEffect(() => {
        if (isFlashcardDataInserted === true) {
            ShowToast('flashcard has been added', 'success');
            dispatch(GetFlashcardThunk(username));
            setOpenAddFlashcardModal(false);
            dispatch(clearIsFlashcardDataInserted());
        }
        if (isFlashcardDataInserted === false) {
            ShowToast('failed to insert flashcard', 'error');
            dispatch(clearIsFlashcardDataInserted());
        }

    }, [isFlashcardDataInserted])
    // -------------------------------------------------------------------

    const actualFlashcard = useSelector(flashcardDataTemp);

    const [flashcardItem, setFlashcardItem] = useState({
        flashcardItemFront: '',
        flashcardItemBack: '',
    })

    const handleFlashcardItemChangeFunc = (e) => {
        const { name, value } = e.target;
        setFlashcardItem({ ...flashcardItem, [name]: value });
    };

    const [flashcardItemID, setFlashcardItemID] = useState(null); // holds flashcard item id and flashcard id

    const handleFlashcardItemSubmit = (e) => {
        e.preventDefault();

        const flashcardItemTemp = {
            flashcardItemID: flashcardItemID,
            flashcardItemUser: username,
            flashcardItemFront: flashcardItem.flashcardItemFront,
            flashcardItemBack: flashcardItem.flashcardItemBack,
        }
        dispatch(InsertFlashCardItemThunk({ flashcardItemTemp }))
    }

    const isFlashcardItemInserted = useSelector(isFlashcardItemInsertedTemp);

    useEffect(() => {
        if (isFlashcardItemInserted === true) {
            setFlashcardItem({
                flashcardItemFront: '',
                flashcardItemBack: '',
            })
            dispatch(clearIsFlashcardItemInserted());
        }
        if (isFlashcardItemInserted === false) {

            ShowToast('failed to add flashcard item', 'error');
            dispatch(clearIsFlashcardItemInserted());
        }

    }, [isFlashcardItemInserted])
    // ---------------------------------------------------

    const actualFlashcardItem = useSelector(flashcardItemTemp);

    const [copiedFlashcard, setCopiedFlashcard] = useState([]);

    const handleStudyBtnFunc = (flashcardID) => {
        dispatch(GetFlashcardItemThunk(flashcardID));
        setShowContainer(true);
        setFlashcardIndex(flashcardIndex = 0);

        if (copiedFlashcard.length == 0) {

        }
    }

    useEffect(() => {
        setCopiedFlashcard(prevArray => {
            const newArray = [...actualFlashcardItem];
            shuffleCoppiedObject(newArray);
            return newArray;
        });
    }, [actualFlashcardItem])


    // Function to shuffle flashcard
    const shuffleCoppiedObject = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    var [flashcardIndex, setFlashcardIndex] = useState(0);
    if (flashcardIndex === copiedFlashcard.length) {
        flashcardIndex = 0;
    }

    if (flashcardIndex < 0) {
        flashcardIndex = copiedFlashcard.length - 1;
    }

    const RemoveFlashcardFunc = () => {
        copiedFlashcard.splice(flashcardIndex, 1);
        setFlashcardIndex(flashcardIndex = 0);
    }

    console.log(flashcardIndex);


    const [showAnswer, setShowAnswer] = useState(false);
    const [backanswer, setBackAnswer] = useState('');

    useEffect(() => {
        if (showAnswer === true) {
            setBackAnswer(copiedFlashcard[flashcardIndex].flashcarditemback);
        }
        if (showAnswer === false) {
            setBackAnswer('');
        }
    }, [showAnswer]);

    // ----------------------------------------------
    const [showContainer, setShowContainer] = useState(false)

    const showContainerString = showContainer ? '' : 'hidden';

    useEffect(() => {
        if (copiedFlashcard.length == 0) {
            setShowContainer(false);
        }
    }, [copiedFlashcard.length])


    const FlashcardColorFunc = (FlashcardColorFunc) => {
        if (FlashcardColorFunc === 'english') return 'bg-blue-300';
        if (FlashcardColorFunc === 'filipino') return 'bg-violet-300';
        if (FlashcardColorFunc === 'mathematics') return 'bg-green-300';
        if (FlashcardColorFunc === 'social science') return 'bg-pink-300';
        if (FlashcardColorFunc === 'humanities') return 'bg-yellow-300';
        if (FlashcardColorFunc === 'communication skills') return 'bg-orange-300';
        if (FlashcardColorFunc === 'ict') return 'bg-red-300';
    }

    // ---------------------------------------------------------------------

    const DeleteFlashCardDataFunc = (flashcardID) => {
        dispatch(DeleteFlashCardDataThunk(flashcardID));
    }
    const isFlashcardDataDeleted = useSelector(isFlashcardDataDeletedTemp);

    const [getflashcardID, setGetflashcardID] = useState(null);

    useEffect(() => {
        if (isFlashcardDataDeleted === true) {
            dispatch(GetFlashcardThunk(username));
            dispatch(clearIsFlashcardDataDeleted());
            dispatch(DeleteFlashCardItemByIDThunk(getflashcardID))
        }
        if (isFlashcardDataDeleted === false) {
            ShowToast('failed to delete flashcard', 'error');
            dispatch(clearIsFlashcardDataDeleted());
        }

    }, [isFlashcardDataDeleted]);




    return (
        <div className="relative h-[90%] w-[69rem] max-w-[95%]">


            <section className={`overflow-hidden rounded-md h-[9%] w-full justify-end flex items-center`}>

                <Button onClick={() => { setOpenAddFlashcardModal(true) }} gradientDuoTone="purpleToBlue" className=" m-1 rounded-md ">
                    add
                </Button>

            </section>

            <section className="h-[91%] w-full mt-3 overflow-scroll noScrollbar flex flex-wrap content-start gap-4">
                {

                    actualFlashcard.map((item) => (
                        <div key={item.flashcardID} className={`${themeHolder.border} ${FlashcardColorFunc(item.flashcardsubject)} relative h-[12rem] w-[16rem] rounded-lg flex flex-col justify-between border-none overflow-hidden`}>
                            <p className="text-[2rem] absolute top-0 left-3">{item.flashcardtitle}</p>


                            <div className="absolute top-0 right-0 bg-black bg-opacity-40 backdrop-blur-sm h-full w-[4rem] pt-4 flex flex-col items-center justify-start gap-y-6 text-2xl text-yellow-500">
                                <Tooltip style="light" placement="left" content={'add'}>
                                    <IoMdAddCircleOutline onClick={() => { setOpenAddFlashcardItemModal(true); setFlashcardItemID(item.flashcardID); }} className="cursor-pointer" />
                                </Tooltip>

                                <Tooltip style="light" placement="left" content={'study'}>
                                    <LuBookOpen onClick={() => { handleStudyBtnFunc(item.flashcardID) }} className="cursor-pointer" />
                                </Tooltip>

                                <Tooltip style="light" placement="left" content={'delete'}>
                                    <RiDeleteBin6Line onClick={() => { DeleteFlashCardDataFunc(item.flashcardID); setGetflashcardID(item.flashcardID) }} className="cursor-pointer" />
                                </Tooltip>
                            </div>

                        </div>
                    ))


                }
            </section>


            {/* add flashcard item modal */}

            {
                actualFlashcardItem.length === 0 ?
                    (
                        <section className={`${themeHolder.colorbg2} ${showContainerString} ${themeHolder.colortxt1} absolute rounded-lg top-0 h-full w-full
                    flex flex-col items-center justify-center gap-y-10 font-semibold`}>
                            <p className="text-[3rem]">No Flashcard Available!</p>

                            <button onClick={() => { setShowContainer(false) }} className={`${themeHolder.colorbg1} text-gray-300 flex hover:border hover:border-yellow-500 items-center gap-x-10 justify-center h-[6rem] w-[20rem] rounded-[10rem]  `}>
                                <MdOutlineArrowBack className="text-[4rem]" />
                                <span className="text-[3rem] ">Back</span>
                            </button>
                        </section>
                    )
                    :
                    (
                        <section className={`${themeHolder.colorbg2} ${showContainerString} ${themeHolder.colortxt1} absolute rounded-lg top-0 h-full w-full
                    flex flex-col items-center justify-center gap-y-20 text-[2rem] font-semibold`}>

                            {copiedFlashcard.length > 1 ?
                                <p className="absolute top-3 left-3 font-thin text-lg">{copiedFlashcard.length} <span>cards</span></p>
                                :
                                <p className="absolute top-3 left-3 font-thin text-lg">{copiedFlashcard.length} <span>card</span></p>
                            }


                            {/* this check if copied array is empty or not */}
                            <section className="h-[12rem] w-[90%] flex flex-col items-center justify-between">

                                {copiedFlashcard.length > 0 ?
                                    (
                                        <>
                                            <p>{copiedFlashcard[flashcardIndex].flashcarditemfront}</p>
                                            <p>{backanswer}</p>
                                        </>
                                    )
                                    :
                                    (
                                        ''
                                    )
                                }
                            </section>
                            <section className="w-[95%] flex flex-col items-center gap-y-6"> 

                                <div className="flex items-center justify-center gap-x-20">

                                <GrCaretPrevious  onClick={() => {
                                        setFlashcardIndex(flashcardIndex - 1);
                                        setShowAnswer(false)
                                    }}/>
                                <GrCaretNext onClick={() => {
                                        setFlashcardIndex(flashcardIndex + 1);
                                        setShowAnswer(false);
                                    }}/>
                                </div>

                                <div className={`${themeHolder.colortxt1} h-[4rem] w-[30rem] max-w-full flex gap-x-5 text-lg mobile:h-[3rem] mobile:text-sm `}>

                                    <button  onClick={() => {
                                        RemoveFlashcardFunc();
                                        setShowAnswer(false)
                                    }} className={`rounded-lg bg-green-600 w-full hover:bg-green-700 `}>
                                        remove
                                    </button>

                                    <button onClick={() => {
                                        setShowAnswer(true)
                                    }} className={`rounded-lg bg-blue-600 w-full hover:bg-blue-700`}>
                                        show answer
                                    </button>

                                    <button onClick={() => {
                                        setShowContainer(false);
                                        setCopiedFlashcard([]);
                                        setFlashcardIndex(flashcardIndex = 0);
                                    }} className={`rounded-lg bg-orange-600 w-full hover:bg-orange-700`}>
                                        close
                                    </button>

                                </div>
                            </section>
                        </section>
                    )
            }


            {/* add flashcard item modal */}
            <Modal size="md" dismissible show={openAddFlashcardItemModal} onClose={() => setOpenAddFlashcardItemModal(false)}>
                <form onSubmit={handleFlashcardItemSubmit} action="">
                    <div className={`${themeHolder.colorbg3} space-y-8 bg-gray-700 rounded-lg p-5`}>
                        <h3 className={`${themeHolder.colortxt1} text-xl font-medium text-gray-300 dark:text-white`}>Add Item</h3>

                        <div className="flex flex-col items-start gap-y-2">

                            <div className="w-full">
                                <label htmlFor="flashcardItemFront" className={`${themeHolder.colortxt1} text-lg text-gray-300`}>Enter Front:</label>

                                <textarea
                                    onChange={handleFlashcardItemChangeFunc}
                                    value={flashcardItem.flashcardItemFront}
                                    name="flashcardItemFront" id="flashcardItemFront" className={`${themeHolder.colorbg3} ${themeHolder.border} ${themeHolder.colortxt1} h-[6rem] w-full bg-gray-600 rounded-sm outline-none p-2 text-gray-300 text-md`} placeholder="Enter a question..."></textarea>
                            </div>

                            <div className="w-full">
                                <label htmlFor="flashcardItemBack" className={`${themeHolder.colortxt1} text-lg text-gray-300`}>Enter Back:</label>

                                <textarea
                                    onChange={handleFlashcardItemChangeFunc}
                                    value={flashcardItem.flashcardItemBack}
                                    name="flashcardItemBack" id="flashcardItemBack" className={`${themeHolder.colorbg3} ${themeHolder.border} ${themeHolder.colortxt1} h-[6rem] w-full bg-gray-600 rounded-sm outline-none p-2 text-gray-300 text-md`} placeholder="Enter a answer..."></textarea>
                            </div>



                        </div>

                        <div className='flex flex-row gap-x-3'>
                            <Button className='w-fit rounded-md' type='submit' gradientMonochrome="cyan">add</Button>

                            <Button className='w-fit rounded-md' onClick={() => setOpenAddFlashcardItemModal(false)} gradientMonochrome="success">close</Button>
                        </div>
                    </div>
                </form>
            </Modal>

            {/* add flashcard modal */}
            <Modal size="md" dismissible show={openAddFlashcardModal} onClose={() => setOpenAddFlashcardModal(false)}>
                <form onSubmit={handleFlashcardSubmit} action="">
                    <div className={`${themeHolder.colorbg3} space-y-8 bg-gray-700 rounded-lg p-5`}>
                        <h3 className={`${themeHolder.colortxt1} text-xl font-medium text-gray-300 dark:text-white`}>Create Flashcard</h3>

                        <div className="flex flex-col items-start gap-y-2">

                            <div className="w-full">
                                <label htmlFor="flashcardSubject" className={`${themeHolder.colortxt1} text-lg text-gray-300`}>Choose a subject:</label>
                                <select
                                    onChange={handleFlashcardDataChangeFunc}
                                    value={flashcardData.flashcardSubject}
                                    id="flashcardSubject"
                                    name="flashcardSubject"
                                    className={`${themeHolder.colorbg3} ${themeHolder.border} ${themeHolder.colortxt1} bg-gray-600 rounded-sm w-full outline-none p-2 text-gray-300 text-md `}>
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
                                <label htmlFor="flashcardTitle" className={`${themeHolder.colortxt1} text-lg text-gray-300`}>Enter flashcard title:</label>
                                <input onChange={handleFlashcardDataChangeFunc} value={flashcardData.flashcardTitle} type="text" name="flashcardTitle" id="flashcardTitle" className={`${themeHolder.colorbg3} ${themeHolder.border} ${themeHolder.colortxt1} bg-gray-600 rounded-sm w-full outline-none p-2 text-gray-300 text-md`} placeholder="flashcard Title:" />
                            </div>

                        </div>

                        <div className='flex flex-row gap-x-3'>
                            <Button className='w-fit rounded-md' type='submit' gradientMonochrome="cyan">submit</Button>

                            <Button className='w-fit rounded-md' onClick={() => setOpenAddFlashcardModal(false)} gradientMonochrome="success">close</Button>
                        </div>
                    </div>
                </form>
            </Modal>


        </div>
    );
};





