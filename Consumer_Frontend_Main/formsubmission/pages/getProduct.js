import { useRouter } from 'next/router';
import { useState } from 'react';

import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

export default function SocialProfileWithImage() {
  const router = useRouter();
  const productData = JSON.parse(router.query.productData || '{}');

  console.log("rpdouct data  get product : " , productData)
  const [isRedirected, setIsRedirected] = useState(false);

  const handleRequestButtonClick = () => {
    // Perform any actions you need before redirecting
    // ...
    console.log("requ button clikc")
    // Redirect to '/requestTransaction'
    router.push({
      pathname: '/requestTransaction', // replace with the actual name of your route
      query: { productData: JSON.stringify(productData) }
    });

    // Set the flag to prevent automatic redirect
    setIsRedirected(true);
  };

  return (
    <Center py={6}>
      <Box
        maxW={'800px'}
        h={'70vh'} // Increase the height
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
      >
        <Image
          h={'120px'}
          w={'full'}
          src={
            'https://media.designrush.com/inspiration_images/134805/conversions/_1512076803_93_Nike-desktop.jpg'
          }
          objectFit="cover"
          alt="#"
        />
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtpLpHlGJu1Rqm2t46o4i_s2WJSdKWfSEHTw&usqp=CAU'
            }
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
              {productData.productName || 'Default Name'}
            </Heading>
            <Text color={'gray.500'}>
              {productData.productHash || 'Default Job Title'}
            </Text>
          </Stack>

          <Stack direction={'row'} justify={'space-evenly'} spacing={10}>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>
                {productData.ownerName || 'Default Name'}
              </Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                Owned by
              </Text>
            </Stack>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>
                {productData.ownerEmail || 'Default Name'}
              </Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                Owner's Email
              </Text>
            </Stack>
          </Stack>
            <br/>
            <br/>
          <Stack direction={'row'} justify={'space-evenly'} spacing={6}>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>
                {productData.manufacturerName || 'Default Name'}
              </Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                Manufactured By
              </Text>
            </Stack>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>
                {productData.price || 'Default Name'} Rs
              </Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                Price
              </Text>
            </Stack>
          </Stack>

          <Button
      onClick={handleRequestButtonClick}
      w={'full'}
      mt={8}
      bg={useColorModeValue('#151f21', 'gray.900')}
      color={'white'}
      rounded={'md'}
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: 'lg',
      }}
      // Disable the button if transactionCount is 2
      isDisabled={productData.transactionCount === 2}
    >
      {productData.transactionCount === 2 ? 'Product Already Sold' : 'Request'}
    </Button>
        </Box>
      </Box>
    </Center>
  );
}
