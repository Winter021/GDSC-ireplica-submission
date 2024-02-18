'use client'
import { useRouter } from 'next/router';

import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
} from '@chakra-ui/react'

import { useState,useEffect } from 'react'
import axios from 'axios'
const {log} = console; 


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
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  )
}
import NavBar from './navBar';
export default function findProduct() {

    // const [productHash , setphash] = useState("");
    const [transactionHash , setthash] = useState("");
    const [otp , setotp] = useState();
    // const [tokenId , settid] = useState();
    // const [tokenHash , sethash] = useState();

    // log(productName)
    // log(tokenHash)
    const router = useRouter(); // Use the useRouter hook
    
  
    useEffect(() => {
      // Fetch and set productData when the component mounts
      const fetchData = async () => {
        const datathash = router.query.transactionHash ;
        // console.log("data from quer ", datathash)
        // setthash(data);
        if (datathash) {
          setthash(datathash);
        }
      };
  
      fetchData();
    }, [router.query.transactionHash]);
  

    // console.log( "this is transaction has ", transactionHash)
    const handleSubmit = async(event) =>{
        // log("HANGLE SUBM")
        event.preventDefault();
        const productPayload = {
          transactionHash:transactionHash,
          otp
        }


        // sending data to Backend
        try {
            const {data ,status} = await axios({
                url:"/api/verifyOTP",
                method:"POST",
                data : productPayload
            });

            log("data ",data)
            log("status ",status)
            
            if(data.status === 200)
            {
              alert("Transaction success" )
                router.push({
                    pathname: '/transactionResult',
                    query: { productData: JSON.stringify(data.data) }, // Pass the data as a query parameter
                  });
            }
            if(data.status === 500)
            {
              alert("Transaction Failed" , `${data}`)
              // router.push({
              //   pathname: '/transactionResult',
              //   query: { productData: JSON.stringify(data.data) }, // Pass the data as a query parameter
              // });
                
            }
            

            console.log("ax error data data : ",status)

            if(data.status === 422)
            {
                alert("Product not found")
            }
            if(data === 200)
            {
                alert("Transaction success")
            }
            if(data === 200)
            {
                alert("Transaction failed")
            }

            if(data.AxiosError.response.status === 500)
            {
                alert("500 error")
            }
            
        }
        catch(err)
        {
            log("Err : "  ,err);
        } 
// url:"https://crudireplica-production.up.railway.app//register",

    }

  return (
    <Box position={'relative'}>
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}>
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
                Verify your OTP
              <Text as={'span'} bgGradient="linear(to-r, red.400,pink.400)" bgClip="text">
                !
              </Text>
            </Heading>
            <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
            An OTP is been sent to your email address, and this otp is valid for 3 minutes.

            </Text>
          </Stack>
          <Box as={'form'} mt={10}>
            <Stack spacing={4}>
              <Input
                placeholder="Enter your 6 digit one time password   "
                value = {otp}
                onChange ={({target}) => setotp(target.value)}
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
             
             
              
              {/* <Button fontFamily={'heading'} bg={'gray.200'} color={'gray.800'}>
                Upload CV
              </Button> */}
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
          form
        </Stack>
      </Container>
      <Blur position={'absolute'} top={-10} left={-10} style={{ filter: 'blur(70px)' }} />
    </Box>
  )
}