import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Post = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Make a POST request to submit the blog post
            const response = await axios.post("https://backend.saptarshimajumder12345.workers.dev/api/v1/blog/post",
                {
                    title,
                    body
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            // Navigate to the post detail page after successful submission
            navigate(`/blog?id=${response.data.id}`);
        } catch (error) {
            console.error("Error submitting post:", error);
            // Handle error if submission fails
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-gray-200 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold mb-4">New Blog Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
                    <input
                        type="text"
                        id="title"
                        className="block w-full bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="body" className="block text-gray-700 font-semibold mb-2">Body</label>
                    <textarea
                        id="body"
                        className="block w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 resize-none"
                        style={{ height: "300px" }}
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
                >
                    Publish
                </button>
            </form>
        </div>
    );
};

export default Post;
