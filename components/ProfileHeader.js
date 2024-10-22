function ProfileHeader({ profile }) {
    
    return (
        <div className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col items-center">
                            <img
                                className="h-40 w-40 rounded-full"

                                src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${profile.image}`}
                                alt=""
                            />
                            <div className="ml-4">
                                <h1 className="text-2xl text-center font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                                    {profile.username}
                                </h1>
                                <p className="text-gray-600 text-sm">
                                    40M followers &bull; 100 following
                                </p>
                                <p className="text-gray-600 text-sm">
                                    gvgvgb hbhbhb byhhu hbbu
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader