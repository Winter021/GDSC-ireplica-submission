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
    

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
  <Button style={{ padding: '20px', fontSize: '1.5em', height: '10vh' }} onClick={handleFindProductClick}>
    Find Product
  </Button>
</div>
    </>
  );
};

export default Home;
