import Image from 'next/image'

type NavBarProps = {
    filterFunc: any
}

export default function NavBar(props: NavBarProps) {
    return (
        <>
            <p className='text-right text-xs'>with 💗 from <a href="https://linkedin.com/in/ibnjunaid">@ibnjunaid</a> and
                <a href="https://www.linkedin.com/in/sucheta-mahata/"> @sucheta</a>
            </p>
            <div className="navbar bg-base-100 ">
                <div className="flex-1">
                    <Image src="/GDSC.png" width={400} height={50}
                        alt="Shoes" className="rounded-xl bg-green-200 p-2"
                    />
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