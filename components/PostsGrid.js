import { PostContext } from "@/context/PostContext";
import { useContext, useState } from "react";

function PostsGrid() {

    const posts = [{
        id: 0,
        url: "nn",
        imageUrl: "gvbbbbu",
        caption: "Hello World",
        date: "17 April"
    }, {
        id: 1,
        url: "nn",
        imageUrl: "gvbbiugbbbu",
        caption: "Hello World",
        date: "17 April"
    }, {
        id: 2,
        url: "nn",
        imageUrl: "gvbllbbbu",
        caption: "Hello World",
        date: "17 April"
    }, {
        id: 3,
        url: "nn",
        imageUrl: "gvbssbbbu",
        caption: "Hello World",
        date: "17 April"
    }, {
        id: 4,
        url: "nn",
        imageUrl: "gvbhhbbbu",
        caption: "Hello World",
        date: "17 April"
    },]
   
    return (
        <div className="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="grid  grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {posts.map((post) => (
                    <div className="group block">
                        {/* //<a key={post.id} href={post.url} className="group block"> */}
                        <div className="relative rounded-lg overflow-hidden aspect-w-1 aspect-h-1">
                            <img
                                src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${post.imageUrl}`}
                                alt={post.caption}
                                className="object-cover pointer-events-none group-hover:opacity-75"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent pointer-events-none group-hover:opacity-0"></div>
                            <div className="absolute bottom-0 left-0 px-4 py-2 bg-white bg-opacity-75 w-full pointer-events-none">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {post.caption}
                                </p>
                                <p className="text-sm font-medium text-gray-500">{post.date}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PostsGrid 