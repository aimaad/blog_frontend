import React ,{useEffect,useState} from 'react'
import {  getUsers } from '../Services/GlobalApi';


function IntroPost({post}) {
  
  post.image=`https://picsum.photos/id/${post.id}/480/290`;
  post.userimage=`https://randomuser.me/api/portraits/men/${post.userId}.jpg`;
  
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


  
  return (
<div className="flex justify-center mt-10 ms-5 me-5">
  <div className="grid grid-cols-2 gap-10">
    <img className='rounded-lg object-cover w-full h-full' src={post.image} alt='intropost_cover' />
    <div className="flex items-center">
      <div className='text-justify text-gray-500'>
        <h2 className='font-bold text-orange-500 text-[23px]'>{post.title}</h2>
        <br />
        {post.body} {post.body} {post.body} {post.body}
        <div>
       
        
        <div className='flex items-center justify-left'>
        <img className='rounded-full w-[40px] mt-5' src={post.userimage}  alt='user_image'/>
          <div className='text-center mt-5 ms-3'>
                {users.map((user) =>
                  user.id === post.userId ? <h1 key={user.id}>{user.name}</h1> : null
                )}
              </div>
          </div>
        </div>
        
        
        
      </div>
     
    </div>
  </div>
</div>

  )
};
export default IntroPost ;

