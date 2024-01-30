import { useSession } from "next-auth/react";

export const withAuth = (
  WrappedComponent: React.ComponentType,
  isPublic: boolean = false
) => {
  const AuthProtectedPage: React.FC = (props) => {
    const { status } = useSession();
    if (isPublic || status === "authenticated") {
      return <WrappedComponent {...props} />;
    } else {
      window.location.replace("/auth/signin");
    }
  };

  return AuthProtectedPage;
};
