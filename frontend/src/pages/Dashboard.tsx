import  { useEffect, useState } from 'react';
import axios from 'axios';
import Topbar from '../components/Topbar';
import { Blogs } from '../components/Blogs';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/signup');
        }
    }, []); // Empty dependency array ensures this effect runs only once on mount
    
    const [details, setDetails] = useState<UserDetails>({ name: '', email: '', id: '' });
    const [filter,setfilter]=useState('');
    const navigate = useNavigate();
    const handleSearch = (x: string) => {
        setfilter(x);
    };
    type UserDetails = {
        name: string;
        email: string;
        id: string;
    };
    
    
    const token = localStorage.getItem('token');
    if(!token){
        navigate('/signup');
    }
    
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get(`https://backend.saptarshimajumder12345.workers.dev/api/v1/user/info`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.data.userData) {
                    setDetails(response.data.userData);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        fetchDetails();
    }, []);

    const handleNewBlog = () => {
        navigate("/post");
    };

    return (
        <>
            <Topbar onSearch={handleSearch} />
            <div className=' mt-20'>
                <div className="mx-20 mt-8 p-6 flex justify-between items-center bg-gray-700 rounded-lg shadow-md text-white">
                    <div>
                        <h2 className="text-3xl font-semibold mb-2">{details.name}</h2>
                        <p className="text-gray-400">{details.email}</p>
                    </div>
                    
                    <button onClick={handleNewBlog} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        New Blog
                    </button>
                </div>
                {details.id && <Blogs filter={filter} id={details.id} />}
            </div>
            
        </>
    );
};

export default Dashboard;
