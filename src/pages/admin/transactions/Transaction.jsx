import { Grid } from "./components/Grid";
import { Search } from "./components/Search";


export const Transaction = () => {
  return (
    <div className=" w-full flex">
      <div className=" w-full p-5 flex-col space-y-10">
        {/* <Search/> */}
        <Grid/>
      </div>
    </div>
  );
}
