import React from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import gdg_logo from '../public/gdg_logo.svg'

export default function HomePage() {

  //routing to /signup page
  const router = useRouter();

  return (
    <>
      <div
        className="max-w-full text-center bg-gradient-to-r
            from-indigo-200 via-red-200 to-indigo-200 sm:h-screen"
      >
        <div className="w-full">
          <Image className="p-3 sm:p-1 md:p-3 xl:p-2 m-auto  md:m-10 xl:m-0 " src={gdg_logo} width="200" height='200' alt='gdg_logo'></Image>

          <div className="    w-full xl:p-20   p-5">
            <h1 className=" sm:text-3xl md:text-3xl  xl:text-4xl text-2xl p-0  font-bold">
              Welcome To <br /> “Google Cloud Career Practitioner Dashboard.”
            </h1>
          </div>

          <div className=" w-10/12 m-auto p-10 shadow-[rgba(0.3,_0.3,_0.1,_0.2)_0px_10px_10px]  rounded-3xl">
            <h2 className="mb-5">
              If you are Facilitator <br /> Please register your insitution for
              better tracking of your students performances.
            </h2>
            <button
              className="btn btn-primary"
              onClick={() => router.push("/institution/signup")}
            >
              Register Here
            </button>
          </div>

          <div className="w-full  p-20 mt-10">
            <h2 className="text-ml font-bold  mt-100 text-grey-300	tracking-wider text-blue-500">
              {" "}
              If you are student? Contact your Facilitator for Unique URL.{" "}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
