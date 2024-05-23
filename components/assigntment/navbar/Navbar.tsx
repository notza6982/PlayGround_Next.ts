"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import HomeIcon from '@mui/icons-material/Home';

const Navbars = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased ">
      <div className=" max-w-full rounded-none h-[80px] shadow-sm z-[3000]">
        <Link href="/">
          <HomeIcon sx={{ fontSize: 60 }} className="flex "/>
        </Link>
      </div>
    </div>
  );
};

export default Navbars;
