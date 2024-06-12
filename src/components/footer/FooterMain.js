import {
    Box,
    Stack,
    HStack,
    VStack,
    Link,
    Divider,
    Image,
    Text,
    Button,
    IconButton,
    LinkProps
  } from '@chakra-ui/react';
  // Here we have used react-icons package for the icons
  import { FaGithub } from 'react-icons/fa';
  import { BsDiscord } from 'react-icons/bs';
  
  export default function FooterMain (){
    const CustomLink = ({ children, ...props }) => {
        return (
          <Link href="#" fontSize="sm" _hover={{ textDecoration: 'underline' }} {...props}>
            {children}
          </Link>
        );
      };

    return (
      <Box p={{ base: 5, md: 8 }} maxW="7xl" marginInline="auto" borderTopWidth={2}>
        <Stack
          spacing={{ base: 8, md: 0 }}
          justifyContent="space-between"
          direction={{ base: 'column', md: 'row' }}
        >
          <Box maxW="300px">
          <Text mt={2} color="gray.500" fontSize="xl">
              Renkaru
            </Text>
            <Text mt={2} color="gray.500" fontSize="md">
            Rent with confidence and embark on your adventure knowing that every mile is backed by our promise of quality and trust.
            </Text>
          </Box>
          
        </Stack>
  
        <Divider my={4} />
  
        <Stack direction={{ base: 'column', md: 'row' }} spacing={3} justifyContent="space-between">
          <Text fontSize="md">
            Built by{' '}
            <Link
              href="https://github.com/Mirai-Digital-Solusi/renkaru"
              textDecoration="underline"
              _hover={{ textDecoration: 'underline' }}
              isExternal
            >
              Renkaru Rental Apps 
            </Link>
            &nbsp;| &copy; {(new Date().getFullYear())} All rights reserved
          </Text>
          <Stack spacing={2} direction={{ base: 'column', md: 'row' }}>
            <Button leftIcon={<FaGithub />} as={Link} href="https://github.com/Mirai-Digital-Solusi/renkaru" rounded="md" colorScheme="gray">
              Github Discussions
            </Button>
          </Stack>
        </Stack>
      </Box>
    );
  };
  
  
  
