import Link from "next/link";

function Navbar() {
  return (
    <div className=" navbar fixed top-0 z-50 justify-center bg-base-200 backdrop-blur-md backdrop-opacity-10">
      <Link href={"/"} className="rounded-md p-2 ">
        <h1 className=" text-2xl font-bold text-primary">Quizzify</h1>
      </Link>
    </div>
  );
}

export default Navbar;
