const AuthLayout = ({ children }) => {
  return (
    <section className="flex min-h-screen items-center justify-center bg-[url('/images/auth/auth.png')] bg-cover bg-center bg-no-repeat">
      {children}
    </section>
  );
};

export default AuthLayout;
