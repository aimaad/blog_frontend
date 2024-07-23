import React, { useState , useEffect } from 'react';
import banner from '../assets/images/banniere.jpg';
import { IoSearchOutline } from "react-icons/io5";
import {  getUsers } from '../Services/GlobalApi';

function SearchBlog({ handleSearch, selectedTag }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [users, setUsers] = useState([]);
  

  useEffect(() => {
    getUsers()
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleSearchClick = () => {
    handleSearch(searchTerm);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className='flex justify-center mt-8 flex-col'>
      <img src={banner} className='rounded-2xl px-[290px]' alt="Banner" />
      <div className='bg-white shadow-lg p-4 rounded-lg mt-[-30px] mx-[25%] flex items-center'>
        <IoSearchOutline className='text-[20px] text-gray-400' />
        <input
          type='text'
          placeholder='Search'
          className='outline-none'
          value={searchTerm}
          onChange={handleChange}
        />
        <button
          className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-xl ml-auto'
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>
      <div className='flex gap-10 justify-center mt-5'>
        {users.map((item, index) => (
          <ul
            key={item.id}
            onClick={() => { setActiveIndex(index); selectedTag(item.id); }}
            className={`${
              index === activeIndex ? 'bg-orange-500 text-white' : ''
            } p-1 pb-2 rounded-sm md:rounded-full cursor-pointer md:px-4 hover:scale-110 hover:border-[1px] border-orange-500 transition-all duration-100 ease-in-out`}
          >
            <li>{item.username}</li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default SearchBlog;
