import { useRouter } from "next/router";
import { useEffect, useClient } from "next/client";

const withAuthHandler = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();
    const client = useClient();

    useEffect(() => {
      // Implement your authentication logic here
      const web3Instance = client.localStorage.getItem("web3Instance");
      const userInstance = client.localStorage.getItem("userInstance");

      // If the user is not authenticated, redirect them to the appropriate page
      if (!web3Instance) {
        router.push("/account/wallet");
      }
      if (!userInstance) {
        router.push("/account/register");
      }
    }, []); // Empty dependency array to run the effect only once on the client-side

    // Render the wrapped component if the user is authenticated
    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuthHandler;
