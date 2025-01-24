export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full grid place-content-center">
      <div className="max-w-7xl flex flex-col gap-12 items-start">
        {children}
      </div>
    </div>
  );
}
