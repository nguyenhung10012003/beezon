import Nav from "@/components/Nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav></Nav>
      <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931] justify-center">
        <main className="w-full min-h-screen py-1">{children}</main>
      </div>
    </>
  );
}
