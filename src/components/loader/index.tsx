import ClipLoader from "react-spinners/ClipLoader";


const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full py-36">
    <ClipLoader
      color={"#fff"}
      loading={true}
      size={24}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </div>
  )
}

export default Loader