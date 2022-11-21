import Image from 'next/image'
import Logo from './logo.component'

type NavBarProps = {
    filterFunc: any,
    instituteName: string
}

export default function NavBar(props: NavBarProps) {
    return (
        <>
            <p className='text-right text-xs'>with 💗 from <a href="https://linkedin.com/in/ibnjunaid">@ibnjunaid</a> and
                <a href="https://www.linkedin.com/in/sucheta-mahata/"> @sucheta</a>
            </p>
            <div className="navbar bg-base-100 ">
                <div className="flex-1">
                    <Logo instituteName={props.instituteName} width={400} height={100}></Logo>
                </div>
                <div className="flex-1">
                    <h1>GCCP Leader Board</h1>
                </div>
                <div className="flex-none gap-2">
                    <div className="form-control">
                        <input type="text" placeholder="Search" className="input input-bordered"
                            onChange={props.filterFunc} />
                    </div>
                </div>
            </div>
        </>
    )
}