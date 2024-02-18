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
  const [isRedirected, setIsRedirected] = useState(false);
  console.log("regstucces ",productData)

  async function generateAndDownloadQRCode(hash) {
    try {
        // API endpoint URL
        const apiURL = `http://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(hash)}&size=200x200&format=png`;

        // Make a GET request to the API
        const response = await fetch(apiURL);

        // Check if the request was successful (status code 200)
        if (response.ok) {
            // Convert the response to Blob
            const blob = await response.blob();

            // Create a link element to download the image
            const downloadLink = document.createElement("a");
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = "qrcode.png";

            // Trigger the click event to download the image
            downloadLink.click();
        } else {
            console.error(`Error generating QR code. Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error generating QR code:', error);
    }
}

  const handleRequestButtonClick = () => {
    
    setIsRedirected(true);
    generateAndDownloadQRCode(productData.productHash)
    
};

  return (
    <Center py={6}>
      <Box
        maxW={'700px'}
        h={'520px'} // Increase the height
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
      >
        <Image
          h={'120px'}
          w={'full'}
          src={
            'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
          }
          objectFit="cover"
          alt="#"
        />
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={
              'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
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

          <Stack direction={'row'} justify={'center'} spacing={10}>
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
          <Stack direction={'row'} justify={'center'} spacing={6}>
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
      {productData.transactionCount === 2 ? 'Download QR Code' : 'Download QR Code'}
    </Button>
        </Box>
      </Box>
    </Center>
  );
}
