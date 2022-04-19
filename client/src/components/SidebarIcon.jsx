{
  /* className="relative flex items-center justify-center h-9 w-9 mt-2 mb-2
    mx-auto rounded-lg bg-transparent text-white group"  */
}

const SideBarIcon = ({ icon, text }) => (
  <div
    className="relative flex items-center justify-center h-9 w-9 my-3 mx-auto  text-xl text-white group"
    title={text}
  >
    {icon}
    <span className="absolute w-auto py-2 px-3 m-2 min-w-max left-12 rounded-md shadow-md bg-gray text-white bg-gray-900 text-xs font-bold transition-all duration-100 scale-0 origin-left group-hover:scale-100">
      {text}
    </span>
  </div>
);

export default SideBarIcon;
