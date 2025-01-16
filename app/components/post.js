

const Post = (props) => {

    console.log(props.post.imageUrl)
    
    return (
        



        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex m-3">
                <label  className="btn btn-ghost  btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${props.post.imageUrl}`} height="28" width="28" />
                    </div>
                </label>
                <div className="flex flex-col justify-start">
                    <span className="text-base font-bold text-gray-900 dark:text-white">{props.post.imageUrl}</span>
                    <span className="text-base inline-block text-slate-500 dark:text-white">{props.post.date}</span>
                </div>
            </div>
            <a href="#">
                <img className=" rounded-b-lg bg-yellow-400" src={`https://bafkreifvallbyfxnedeseuvkkswt5u3hbdb2fexcygbyjqy5a5rzmhrzei.ipfs.w3s.link/?filename=treehouse.jpeg`} alt="product image" />
            </a>
        </div>
    )
}

export default Post