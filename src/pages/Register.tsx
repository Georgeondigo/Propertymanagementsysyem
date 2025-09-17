import { AuthLayout } from "@/components/auth/AuthLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join PropertyHub for seamless property management"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;