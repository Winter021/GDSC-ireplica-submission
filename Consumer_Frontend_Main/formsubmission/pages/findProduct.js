'use client'
import { useRouter } from 'next/router';
import {
  Stack,
  Box,
  Container,
  Heading,
  Text,
  Input,
  Button,
  SimpleGrid,
  Icon,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';

const { log } = console;

const Blur = (props) => {
  return (
    <Icon
      width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      {/* ... (unchanged) */}
    </Icon>
  );
};

export default function FindProduct() {
  const [productHash, setProductHash] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const router = useRouter();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // const { data, status } = await axios.post(
      const qrresp = await axios.post(
        'http://api.qrserver.com/v1/read-qr-code/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log("qrerespe status " , qrresp.status)
      // Log the received data to the console
      console.log('QR Code Scanning Data:', qrresp.data);

      if (qrresp.status === 200) {
        // Update the productHash state with the received data
      
        setProductHash(qrresp.data[0]?.symbol[0]?.data || '');
        console.log("productHash :  " , productHash)
        // console.log("phash ; ", data[0]?.symbol[0]?.data || '')
        // const qrhash = data[0]?.symbol[0]?.data || '';
        // Navigate to the getProduct page
        
        try {
          const productPayload = {
            productHash:qrresp.data[0]?.symbol[0]?.data || ''
          }
  
          const {data ,status} = await axios({
              url:"/api/HashgetProduct",
              method:"POST",
              data : productPayload
          });

          // log("data ",data)
          log("status ",status)

          if(status === 200)
          {
              router.push({
                  pathname: '/getProduct',
                  query: { productData: JSON.stringify(data) }, // Pass the data as a query parameter
                });
          }

          if(data.status === 422)
          {
              alert("Product not found")
          }
          if(data === 201)
          {
              alert("The Product has been registered succefully")
          }

          if(data.status === 500)
          {
              alert("500 error")
          }
      }
      catch(err)
      {
          log("Err : "  ,err);
      } 
      
      
      



      } 
      
      else {
        console.error('Error scanning QR code. Status:', status);
        alert('Error scanning QR code. Please try again.');
      }
    } catch (error) {
      console.error('Error scanning QR code:', error);
      alert('Error scanning QR code. Please try again.');
    }
  }; 

  return (
    <Box position={'relative'}>
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
            iReplica{' '}
            <Text as={'span'} bgGradient="linear(to-r, red.400,pink.400)" bgClip="text">
              :
            </Text>{' '}
            Product counterfiet avoidance system
          </Heading>

          <Stack direction={'row'} spacing={4} align={'center'}>
            {/* ... (unchanged) */}
          </Stack>
        </Stack>
        <Stack
          bg={'gray.50'}
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: 'lg' }}>
          <Stack spacing={4}>
            <Heading
              color={'gray.800'}
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
              Check Product Hash
              <Text as={'span'} bgGradient="linear(to-r, red.400,pink.400)" bgClip="text">
                !
              </Text>
            </Heading>
            <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
              Enter product Hash here.
            </Text>
          </Stack>
          <Box as={'form'} mt={10}>
            <Stack spacing={4}>
              <Input
                placeholder="Enter Product Hash"
                value={productHash}
                onChange={({ target }) => setProductHash(target.value)}
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
            </Stack>
            <Button
              onClick={handleSubmit}
              fontFamily={'heading'}
              mt={8}
              w={'full'}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={'white'}
              _hover={{
                bgGradient: 'linear(to-r, red.400,pink.400)',
                boxShadow: 'xl',
              }}>
              Submit
            </Button>
          </Box>
        </Stack>
      </Container>
      <Blur
        position={'absolute'}
        top={-10}
        left={-10}
        style={{ filter: 'blur(70px)' }}
      />
    </Box>
  );
}
