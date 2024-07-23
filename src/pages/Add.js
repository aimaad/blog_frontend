import React, { useState, useEffect } from 'react';
import {  getUsers, addPost } from '../Services/GlobalApi';
import {  useNavigate } from 'react-router-dom';

function Add() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [formError, setFormError] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    getUsers()
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const validateInputs = () => {
    if (title.length > 15) {
      setFormError('The title must not exceed 15 characters.');
      return false;
    }
    if (body.length > 150) {
      setFormError('The body must not exceed 150 characters.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateInputs()) {
      return;
    }
    
    const postData = {
      userId: selectedUser,
      title: title,
      body: body
    };

    addPost(postData)
      .then(response => {
        console.log('Post added successfully:', response.data);
        navigate('/'); 
        setSelectedUser('');
        setTitle('');
        setBody('');
      })
      .catch(error => {
        console.error('Error adding post:', error);
      });
  };
  
  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center mt-4">Add a Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="userSelect" className="text-lg font-medium mb-2">choose a user :</label>
          <select id="userSelect" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} required className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
            <option value="">choose a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="titleInput" className="text-lg font-medium mb-2">Title :</label>
          <input type="text" id="titleInput" value={title} onChange={(e) => setTitle(e.target.value)} required className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="bodyInput" className="text-lg font-medium mb-2">Body :</label>
          <textarea id="bodyInput" value={body} onChange={(e) => setBody(e.target.value)} required rows="6" className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"></textarea>
        </div>
        {formError && (
          <p className="text-red-500 text-sm mb-4">{formError}</p>
        )}
        <button type="submit" className="bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300">Add the Post</button>
      </form>
    </div>
  );
};

export default Add;
