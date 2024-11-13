
import { useLogout } from "@refinedev/core";
import Logo from "../../../public/assets/images/logo.svg"
import { CiLogout } from "react-icons/ci";

const MainHeader = () => {
    const {mutate: logout} = useLogout();


  return (
    <article className='flex justify-between items-center px-[5%] bg-white shadow-md'>
        <img src={Logo} alt="logo" className="w-[200px] lg:w-[312px] lg:h-[104px]" />
        <button type="button" className="bg-primary px-3 lg:px-5 rounded-lg text-sm lg:text-base hover:opacity-90 py-2 flex items-center gap-1"
        onClick={() =>  logout()}>
            <p>Logout</p>
            <CiLogout className="w-5 h-5 lg:w-6 lg:h-6"  />
        </button>
    </article>
  )
}

export default MainHeader