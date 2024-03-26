import  { useState } from 'react';// Assuming you're using React Router for navigation
import Topbar from '../components/Topbar';
import { Blogs } from '../components/Blogs';

const Homepage = () => {
    const [filter,setfilter]=useState('');

    const handleSearch = (x: string) => {
        setfilter(x);
    };
  return (
    <div>
        <Topbar onSearch={handleSearch} />
        <Blogs filter={filter} id=''  />
    </div>
  );
};

export default Homepage;
