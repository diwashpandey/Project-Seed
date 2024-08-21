// Pages and Components import
import LogoAndSearch from "./SubComponents/LogoAndSearch"
import Nav from "./SubComponents/Nav"
import ProfileSection from "./SubComponents/ProfileSection"

function Header(){

    return (
    <header className="h-[60px] w-full mb-2 flex justify-between items-center px-2 bg-main-box md:px-6 fixed z-10">
        <LogoAndSearch />
        <Nav />
        <ProfileSection />
    </header>
    )
}

export default Header