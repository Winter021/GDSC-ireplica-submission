'use client'

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
import { useRouter } from 'next/router';
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

export default function requestTransaction() {
  const router = useRouter();

  const [productData, setProductData] = useState(null);
  const [yourEmail , setyemail] = useState();
  const [yourName , setyname] = useState();
  const [productHash , setphash] = useState("");
  // const productData = this.$route.query.productData;
  
  // const [yourName, setYourName] = useState('');
  // const [productHash, setProductHash] = useState('');

  useEffect(() => {
    // Fetch and set productData when the component mounts
    const fetchData = async () => {
      const data = router.query.productData ? JSON.parse(router.query.productData) : null;
      setProductData(data);
      if (data) {
        setphash(data.productHash);
      }
    };

    fetchData();
  }, [router.query.productData]);

  

    // const [manufacturerName , setmanf] = useState();
    // const [ownerName , setoname] = useState();
    // const [price , setprice] = useState();

    // log(productName)
    // log(tokenHash)

    const handleSubmit = async(event) =>{
        event.preventDefault();

      

        const transactionPayload = {
          yourEmail,
          yourName,
          productHash,
        }
        // console.log("Transaction payload in reqtransction, ")

        // sending data to Backend
        try {
            const {data} = await axios({
                url:"/api/reqTransaction",
                method:"POST",
                data : transactionPayload
            });

            // log("data x ",x)
            console.log("transaction hash ",data.transactionHash)
            if(data.status === 422)
            {
                alert("Cant request a new product , You have a pending transaction")
            }
            if(data.status === 201)
            {
                alert(`Transaction request sent successfully `)
                router.push({
                  pathname: '/enterOTP',
                  query: { transactionHash: data.transactionHash },
                });


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
// // url:"https://crudireplica-production.up.railway.app//register",

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
                Hello Consumer
              <Text as={'span'} bgGradient="linear(to-r, red.400,pink.400)" bgClip="text">
                !
              </Text>
            </Heading>
            <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
              Please enter your details to request for the product.
            </Text>
          </Stack>
          <Box as={'form'} mt={10}>
            <Stack spacing={4}>
              <Input
                placeholder="Enter Your Name"
                value = {yourName}
                onChange ={({target}) => setyname(target.value)}
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
              <Input
                placeholder="Enter Your Email address"
                value = {yourEmail}
                onChange ={({target}) => setyemail(target.value)}
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