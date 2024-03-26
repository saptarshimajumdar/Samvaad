import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type BlogType = {
    id: string,
    authorId: string,
    title: string,
    body: string,
    published: boolean,
}

interface BlogsProps {
    filter: string;
    id : string;
}

export const Blogs = ({ filter,id }: BlogsProps) => {
    const [blogs, setBlogs] = useState<BlogType[]>([]);
    const [searchFilter, setSearchFilter] = useState("");
    const token = localStorage.getItem('token');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchFilter(e.target.value);
    }

    useEffect(() => {
        const fetchBlogs = async () => {
             
            const response = await axios.get(`https://backend.saptarshimajumder12345.workers.dev/api/v1/blog?search=${filter}&id=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setBlogs(response.data.posts);
        }
        fetchBlogs();
    }, [filter])

    return (
        <div className="mt-20">
            <input type="text" value={searchFilter} onChange={handleChange} />
            <div>
                {blogs.map((blog, index) => (
                    <BlogCard blog={blog} key={index} />
                ))}
            </div>
        </div>
    )
}

const BlogCard = ({ blog }: { blog: BlogType }) => {
    const navigate = useNavigate();

    const handleBlogClick = () => {
        navigate(`/blog?id=${blog.id}`);
    };

    return (
        <div className=" bg-slate-100 rounded-lg p-4 mr-20 ml-20 mb-4 shadow-md " onClick={handleBlogClick}>
            <div>
                <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                <p>{blog.body.length > 100 ? blog.body.substring(0, 100) + '...' : blog.body}</p>
            </div>
        </div>
    );
};
