

import { useState } from 'react';
import { useEffect } from 'react';
import { userdata } from '../feature/authenticationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../feature/authenticationSlice';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Button, Avatar, Dropdown, Navbar, NavbarCollapse } from 'flowbite-react';
import { fakeCookie } from '../feature/authenticationSlice';
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from 'react-router-dom';
import { ListGroup } from 'flowbite-react';
import { HiCloudDownload, HiInbox, HiOutlineAdjustments, HiUserCircle } from 'react-icons/hi';

export const Nav1 = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginCookie = useSelector(fakeCookie);

    const udata = useSelector(userdata);
    if (Object.entries(udata).length != 0) {
        var name = udata[0].username;
        var email = udata[0].email;
        var userImgUrl = udata[0].userimage;
    }

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }

    const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
    const [temp, setTemp] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;

            prevScrollPos > currentScrollPos ? setTemp('top-0') : setTemp('top-[-5rem]');

            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);

    const [menuhover, setMenuHover] = useState(false);

    const menuMouseOver = () => {
        setMenuHover(true);
    }

    const menuMouseLeave = () => {
        setMenuHover(false);
    }

    const [avatarImage, setAvatarImage] = useState(null);
    useEffect(() => {
        const fetchImage = async () => {
          try {
            const imageModule = await import(`../assets/userProfile/${userImgUrl}`);
            setAvatarImage(imageModule.default);
          } catch (error) {
            console.error('Error loading image:', error);
          }
        };
    
        fetchImage();
      }, [userImgUrl]);

    return (
        <Navbar fluid rounded className={`${temp} absolute text-gray-400 bg-gray-700 px-12 h-fit w-screen backdrop-blur backdrop-brightness-75 transition-[1s]`}>

            <Navbar.Brand>
                <img className="animate-spin spin h-[3rem] w-[3rem]" src={`${require('../assets/icon/logo192.png')}`} alt="" />
            </Navbar.Brand>

            <section className='flex gap-x-5'>
                <Dropdown
                    className='bg-gray-700'
                    arrowIcon={false}
                    inline
                    label={
                        avatarImage ? (
                            <Avatar img={avatarImage} rounded bordered color="gray" />
                          ) : (null)
                          
                    }>
                <Dropdown.Header>
                    <span className="block text-gray-400 text-sm">{name}</span>
                    <span className="block text-gray-400 truncate text-sm font-medium">{email}</span>
                </Dropdown.Header>
                <Dropdown.Item className='text-gray-400'>View Profile</Dropdown.Item>
                <Dropdown.Item className='text-gray-400'>Edit Profile</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className='text-gray-400' onClick={handleLogout} >Sign out</Dropdown.Item>
            </Dropdown>
            <Tooltip content={'Menu'}>
                <GiHamburgerMenu
                    onMouseOver={menuMouseOver}
                    className='h-full w-full' />
            </Tooltip>
        </section>
            {
        menuhover ?
            (
                <section onMouseLeave={menuMouseLeave} className='w-full list-none rounded-none'>
                    <ListGroup.Item icon={HiOutlineAdjustments}>Practice Tests and Quizzes</ListGroup.Item>
                    <ListGroup.Item icon={HiInbox}>Progress</ListGroup.Item>
                    <ListGroup.Item icon={HiCloudDownload}>Exam Simulation</ListGroup.Item>
                </section>
            ) :
            (
                null
            )
    }

        </Navbar >
    );
}
