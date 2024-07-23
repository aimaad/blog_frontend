import React, { useState, useEffect } from 'react';
import { deletePost, getUsers } from '../Services/GlobalApi';
import { Link } from 'react-router-dom';

const Blogs = ({ posts, paginate, currentPage, postsPerPage, totalPosts }) => {
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

  const lastPage = Math.ceil(totalPosts / postsPerPage);

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce blog ?')) {
      deletePost(id)
        .then(response => {
          console.log('Post deleted successfully:', response);
          window.location.reload();
        })
        .catch(error => {
          console.error('Error deleting post:', error);
        });
    }
  };



  return (
    <div className="justify-center mt-20 ms-5 me-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((item) => (
          <div key={item.id} className="space-y-4 flex flex-col h-full">
            <img
              className="rounded-lg object-cover w-full h-[290px]"
              src={`https://picsum.photos/id/${item.id}/500/290`}
              alt="Post"
            />
            <div className="p-4 bg-white flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-orange-500 text-[23px] mt-3">{item.title}</h3>
                <p className="text-justify text-gray-500 line-clamp-3 mt-3">{item.body}</p>
              </div>
              <div className="flex items-center mt-4">
                <img className="rounded-full w-[40px]" src={`https://randomuser.me/api/portraits/men/${item.userId}.jpg`} alt="User" />
                <div className="ms-3">
                  {users.map(user =>
                    user.id === item.userId ? <h1 key={user.id}>{user.username}</h1> : null
                  )}
                </div>
                <div>
                  <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-orange-600 transition duration-300 ms-6">
                    Delete
                  </button>
                  <button  className="bg-green-500 text-white py-1 px-4 rounded-md hover:bg-orange-600 transition duration-300 ms-6">
                  <Link to={`/edit/${item.id}`} >
Edit</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-5">
        {Array.from({ length: lastPage }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
