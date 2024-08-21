function LogoAndSearch() {
  return(
      <div className="logo-and-search center gap-3">
          <span className="text-theme-color font-semibold">LOGO</span>
          <form action="">
              <input type="text" placeholder="Search for talents" className="hidden h-7 w-48 pl-4 border-[1px] border-orange-500 rounded-2xl bg-theme-darker text-xs md:block focus-visible:outline-none "/>
          </form>
      </div>
  )
}

export default LogoAndSearch