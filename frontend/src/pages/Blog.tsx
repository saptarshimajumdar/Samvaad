import  { useEffect, useState } from "react";
import { Link,useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

interface BlogType {
    id: string,
    authorId: string,
    title: string,
    body: string,
    published: boolean,
}

const Blog = () => {
    const [blog, setBlog] = useState<BlogType | null>(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const blogId = searchParams.get("id");
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!blogId) {
            navigate("/");
            return; // Exit early if blogId is not available
        }

        const fetchBlog = async () => {
            try {
                const response = await axios.get(`https://backend.saptarshimajumder12345.workers.dev/api/v1/blog?blogId=${blogId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setBlog(response.data.posts);
            } catch (error) {
                console.error("Error fetching blog:", error);
            }
        };

        fetchBlog();
    }, []);

    return (
        <div >
            {blog ? (
                <div className="flex flex-col items-center">
                <div className="max-w-3xl mx-auto mt-8 p-6 bg-gray-200 rounded-lg shadow-md">
                    <h2 className="text-3xl font-semibold mb-4">{blog.title}</h2>
                    <p className="text-gray-700">{blog.body}</p>
                </div>
                <Link to="/" className="mb-4 text-blue-500 hover:text-blue-700">
                    <button className="bg-gray-800 mt-6 hover:bg-black transition-colors duration-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Home
                    </button>
                </Link>
                
            </div>
            
            ) : (
                <p>Loading...</p>
            )}
            
        </div>
    );
};

export default Blog;
