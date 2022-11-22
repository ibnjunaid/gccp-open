import Image from "next/image";
import Logo from "./logo.component";
import gdsc_logo from "../public/gdsc_logo.png";

type NavBarProps = {
    filterFunc: any;
    instituteName: string;
};

export default function NavBar(props: NavBarProps) {
    return (
        <>
            <div className="sticky top-0 z-50  bg-gray-100 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
                <div className="navbar w-screen   xl:flex xl:content-center xl:justify-between  flex flex-wrap justify-center ">
                    <div className=" xl:flex flex-col xl:w-3/12 w-6/12  mx-2  ">
                        <Image
                            className=" sm:p-1 md:p-3 xl:p-2 m-auto  md:m-0 xl:m-0 "
                            src={gdsc_logo}
                            width="200"
                            height="200"
                            alt="gdg_logo"
                        ></Image>
                        <p className=" text-sm p-0  m-0 text-center font-bold ">{props.instituteName}</p>
                    </div>

                    <div className="xl:w-4/12   w-full ">
                        <div className="form-control xl:p-1 xl:w-full w-11/12 m-auto p-2 ">
                            <input
                                type="text"
                                placeholder="Search"
                                className="input input-bordered block xl:w-full w-full p-5 text-gray-900 border  bg-gray-50 sm:text-md dark:bg-gray-700 dark:border-gray-600  dark:text-white "
                                onChange={props.filterFunc}
                            />
                        </div>
                    </div>
                    <p className=" sm:text-l  md:text-l lg:text-l text-sm text-right font-extralight ">
                        with 💗 from &nbsp;
                        <a href="https://linkedin.com/in/ibnjunaid">@ibnjunaid</a> &nbsp; and &nbsp;
                        <a href="https://www.linkedin.com/in/sucheta-mahata/"> @sucheta</a>
                    </p>
                </div>
            </div>
        </>
    );
}
