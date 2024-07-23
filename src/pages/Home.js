import React, { useState, useEffect } from 'react';
import IntroPost from '../components/IntroPost';
import SearchBlog from '../components/SearchBlog';
import Blogs from '../components/Blogs';
import { getPost } from '../Services/GlobalApi';

function Home() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const [postsPerPage] = useState(6); 
  const [originalPosts, setOriginalPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, [currentPage]); 

  const fetchPosts = () => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    getPost('').then(resp => {
      const result = resp.data.map(item => ({
        userId: item.userId,
        id: item.id,
        title: item.title,
        body: item.body,
        image: `https://picsum.photos/id/${item.id}/500/290`
      }));
      setOriginalPosts(result);

      const currentPosts = result.slice(indexOfFirstPost, indexOfLastPost);
      setPosts(currentPosts);
    }).catch(error => {
      console.error('Error fetching posts:', error);
    });
  };

  const filterPosts = (userId) => {
    const result = originalPosts.filter(item => item.userId === userId);
    setPosts(result);
  };

  const handleSearch = (searchTerm) => {
    getPost(searchTerm).then(resp => {
      const result = resp.data.map(item => ({
        userId: item.userId,
        id: item.id,
        title: item.title,
        body: item.body,
        image: `https://picsum.photos/id/${item.id}/500/290`
      }));
      setPosts(result);
    }).catch(error => {
      console.error('Error fetching filtered posts:', error);
      setPosts(originalPosts);
    });
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='p-[20px]'>
      <SearchBlog handleSearch={handleSearch} selectedTag={filterPosts} />
      {posts.length > 0 ? <IntroPost post={posts[0]} /> : null}
      {posts.length > 0 ? <Blogs posts={posts} paginate={paginate} currentPage={currentPage} postsPerPage={postsPerPage} totalPosts={originalPosts.length} /> : null}
    </div>
  );
}

export default Home;
