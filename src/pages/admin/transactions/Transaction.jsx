import { Grid } from "./components/Grid";
import { Search } from "./components/Search";


export const Transaction = () => {
  return (
    <div className=" w-full flex">
      <div className=" w-[25%]">
        Navbar
      </div>
      <div className=" w-full p-5 flex-col">
        <Search/>
        <Grid/>
      </div>
    </div>
  );
}
