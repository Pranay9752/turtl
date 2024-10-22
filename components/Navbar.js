import Link from 'next/link';
import { useRouter } from 'next/router';
function Navbar() {
  const router = useRouter();

  const allowedPaths = ["/upload"];
  const showBackButton = allowedPaths.includes(router.pathname);
  const showFollowButton = router.pathname === "/profile";


  // define a function to handle the back button click
  const handleBackClick = () => {
    router.back();
  }

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" legacyBehavior>
                <a>
                 <h1 className="text-gray-800 font-bold text-lg">Turtl</h1>

                </a>
              </Link>
            </div>
          </div>
          {showBackButton && 
          <div className="flex items-center">
            <button
              type="button"
              onClick={handleBackClick}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >

               <Link href="/" legacyBehavior>
                <a>
                    Back
                </a>
              </Link>
            </button>
          </div>}
          {showFollowButton && 
          <div className="flex items-center">
            <button
              type="button"
              onClick={handleBackClick}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >

               <Link href="/" legacyBehavior>
                <a>
                    Follow
                </a>
              </Link>
            </button>
          </div>}
        </div>
      </div>
    </nav>
  );
}
export default Navbar