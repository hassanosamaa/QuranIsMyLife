import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import logo from "/public/logo.png";
import favIcon from "/public/favIcon.png";
import { useEffect, useState } from "react";
import { addToSearch } from "@/store/searchSlice";
import { useRouter } from 'next/router';

export default function Nav() {
  const router = useRouter();

  const countSound = useSelector((state) => state.fav.items);
  const [isClient, setIsClient] = useState(false);
  const dispatch=useDispatch()
  const handleInputChange = (e) => {
    const searchChange=e.target.value;
    dispatch(addToSearch(searchChange))

  };
  const isHomePage = router.pathname === '/';
  


  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <div className="bg-cyan-950 fixed right-0 left-0 z-[99]">
        <div className="container mx-auto p-[10px]">
          <div className="flex justify-between items-center">
            <Link href={"/"}>
              <Image
                src={logo}
                className="w-[30px] h-[30px] md:w-[80px] md:h-[80px]"
                alt="logo"
              />
            </Link>
            {!isHomePage&&
            <div >
              <input
                onChange={handleInputChange}
                type="text"
                placeholder="ابحث..."
                className="p-2 w-[185px] md:w-[300px] rounded-md bg-cyan-800 text-gray-200 
                  font-[500] text-[16px] md:text-[20px] outline-0 text-right"
              />
            </div>}
            <Link href={"/fav"}>
              <div className="relative ">
                <div className="absolute top-0 left-0 bg-gray-300 rounded-full shadow-sm leading-[20px] md:leading-[30px] text-center w-[20px] h-[20px] md:w-[30px] md:h-[30px]">
                  <h3 className="text-red-700 font-[800]">
                    {countSound.length}
                  </h3>
                </div>
                <Image
                  src={favIcon}
                  className="w-[40px] h-[40px] md:w-[60px] md:h-[60px]"
                  alt="fav"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="h-[30px] md:h-[80px]"></div>
    </>
  );
}
