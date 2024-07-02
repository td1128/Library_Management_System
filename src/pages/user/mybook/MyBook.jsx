import Header from './components/tablegrid//Header'
import Stats from './components/tablegrid/Stats'
import GridExample from './components/tablegrid/Table';
import Fetch from './components/tablegrid/Fetch';
import "/Users/sksadiruddin/ProjectFrontend/Library_Management_System/src/index.css"
export const MyBook = () => {
  return (
    <div>
      <Fetch/>
      <Header />
      <Stats />
      <h4 className='currentBookHeading'>Current Borrowed Books</h4>
      <GridExample/>
    </div>
  )
};

