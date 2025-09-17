import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && profile) {
      // Redirect based on user role
      if (profile.role === "tenant") {
        navigate("/tenant", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [user, profile, navigate]);

  return (
    <AuthLayout
      title="Sign In"
      subtitle="Access your property management account"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;