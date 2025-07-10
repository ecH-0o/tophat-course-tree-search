import './css/App.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CourseSearch from './CourseSearch';
const Header = styled('header')(({ theme }) => ({
  padding: theme.spacing(3, 5),
}));

function App() {
  return (
    <>
      <Header>
        <a href="https://tophat.com/">
          <Box
            component="img"
            src="https://tophat.com/wp-content/themes/TOPHAT01/build/images/logo.svg"
            width={125}
            height={21.5}
            alt="Top Hat Logo" />
        </a>
      </Header>
        <CourseSearch />
    </>

  );
}

export default App;
