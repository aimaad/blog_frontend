import React, { useState, useEffect } from 'react';
import { editPost, getPostById } from '../Services/GlobalApi';
import { useParams, useNavigate } from 'react-router-dom';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState({
    title: '',
    body: '',
    userId: '', 
  });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await getPostById(id);
        setPostData({
          title: response.data.title,
          body: response.data.body,
          userId: response.data.userId,
        });
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching post:', error);
        setLoading(false); 
      }
    };

    fetchPostData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (validateInputs()) {
      editPost(id, postData)
        .then(response => {
          console.log('Post edited successfully:', response);
          navigate('/'); 
        })
        .catch(error => {
          console.error('Error editing post:', error);
        });
    } else {
      setFormError('Please fill out all fields.');
    }
  };

  const validateInputs = () => {
    const { title, body } = postData;
    if (title.trim() === '' || body.trim() === '') {
      return false;
    }
    return true;
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center mt-4">Edit Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-lg font-medium mb-2">Title :</label>
          <input
            type="text"
            id="title"
            name="title"
            value={postData.title}
            onChange={handleInputChange}
            className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="body" className="text-lg font-medium mb-2">Body :</label>
          <textarea
            id="body"
            name="body"
            value={postData.body}
            onChange={handleInputChange}
            rows="6"
            className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          ></textarea>
        </div>
        {formError && (
          <p className="text-red-500 text-sm mb-4">{formError}</p>
        )}
        <button type="submit" className="bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Edit;
