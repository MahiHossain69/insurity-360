const PageHeadingTitle = ({ title, subtitle }) => {
  return (
    <div className="mb-8">
      <h1 className="text-foreground text-3xl font-bold">{title}</h1>
      <p className="font-lato mt-2 text-gray-600">
        {subtitle ||
          "Welcome back! Here's what's happening with your platform."}
      </p>
    </div>
  );
};

export default PageHeadingTitle;
