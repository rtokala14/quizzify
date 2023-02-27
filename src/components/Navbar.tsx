import Link from "next/link";

function Navbar() {
  return (
    <div className=" navbar justify-center bg-base-200">
      <Link href={"/"} className="rounded-md p-2 ">
        <h1 className=" text-2xl font-bold text-primary">Quizzify</h1>
      </Link>
    </div>
  );
}

export default Navbar;
