import Image from "next/image";

export default function Header() {
  return (
    <div className="header">
      <div className="navbar">
        <div className="left">
          <Image src="/logo.svg" alt="logo" width={78} height={30} />
          <h1>Memes</h1>
        </div>

        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <Image src="/search.svg" alt="search" width={20} height={20} />
        </div>
      </div>
    </div>
  )
}