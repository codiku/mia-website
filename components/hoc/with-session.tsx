import { useSession } from "next-auth/react";

const withSession = (WrappedComponent: React.ComponentType) => {
  const AuthProtectedPage: React.FC = (props) => {
    const { status } = useSession();

    if (status === "authenticated") {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };

  return AuthProtectedPage;
};

export default withSession;
