import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/react';
import RegisterProduct from './register';
import NavBar from './navBar';
const Home = () => {
  const router = useRouter();

  const handleRegisterClick = () => {
    // Navigate to the '/register' route without a full page reload
    router.push('/register');
  };

  const handleFindProductClick = () => {
    // Navigate to the '/getProduct' route without a full page reload
    router.push('/findProduct');
  };

  return (
    <>
    {/* <NavBar></NavBar> */}
    

      <div>
        {/* Button for registering a product */}
        <Button onClick={handleRegisterClick} mr={2}>
          Register Product Here
        </Button>

        {/* Button for getting a product */}
        <Button onClick={handleFindProductClick}>
          Find Product
        </Button>
      </div>
    </>
  );
};

export default Home;
