import { Box, Button, Flex, IconButton, Image, Input, InputGroup, InputLeftElement, InputRightElement, Stack, Text, WrapItem, useColorMode, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsBell } from 'react-icons/bs';
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon, MoonIcon, SearchIcon, SunIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react';

import logo from "../Images/logo-d-plus.svg"

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const fontTheme = useColorModeValue('white', 'white');
  const navTheme = useColorModeValue('rgba(255, 255, 255, 0)', 'gray.800');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isExpanded, setIsExpanded] = useState(false);
  const navbarRef = useRef(null);

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  const location = useLocation();

  const isLinkActive = (path) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const handleScroll = () => {
      const navbar = navbarRef.current;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const isScrolled = scrollTop > 0;
      if (navbar) {
        navbar.style.background = isScrolled ? 'rgba(0, 0, 0, 0.6)' : 'transparent';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navbarBgColor = useColorModeValue('transparent', 'blackAlpha.800');

  return (
    <>
      <Box
        id="navbar"
        ref={navbarRef}
        position="fixed"
        zIndex="32"
        color="white"
        top="0"
        width="100%"
        height="60px"
        display="flex"
        alignItems="center"
        justifyContent={{ lg: 'center', base: 'space-between' }}
        background={navbarBgColor}
        transition="background 0.3s ease"
      >
        <Box w={{ base: '24%', lg: '11%' }}>
          <Link to="/">
            <Text fontSize={{ lg: '38px', base: '21px' }} color="black">
              <Image w={"41%"} src={logo} alt={"logo"}  />
            </Text>
          </Link>
        </Box>

        <Box display={{ base: 'block', lg: 'none', sm: 'block',md:"block" }}>
          <WrapItem display="flex" alignItems="center">
            <IconButton
              size="md"
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label="Open Menu"
              display={{ md: 'block' }}
              onClick={isOpen ? onClose : onOpen}
            />
          </WrapItem>
        </Box>

        <Box
          fontFamily="cursive"
          fontSize="18px"
          gap="2.4rem"
          mt={{ base: 4, md: 0 }}
          display={{ base: 'none', lg: 'flex', sm: 'none' }}
          justifyContent="left"
          w="58%"
        >
          <Link to="/">
            <Text _hover={{ color: 'purple.500', transform: 'scale(1.1)' }}>Home</Text>
          </Link>

          <Link to="/">
            <Text color={isLinkActive('/notes') ? 'rgb(137,129,216)' : ''} _hover={{ color: 'purple.500', transform: 'scale(1.1)' }}>
              Movies
            </Text>
          </Link>

          <Link to="/">
            <Text _hover={{ color: 'purple.500', transform: 'scale(1.1)' }}>Shows</Text>
          </Link>

          <Link to="/">
            <Text _hover={{ color: 'purple.500', transform: 'scale(1.1)' }}>New & popular</Text>
          </Link>

          <Link to="/">
            <Text _hover={{ color: 'purple.500', transform: 'scale(1.1)' }}>My List</Text>
          </Link>
        </Box>

        <Box alignItems="center" justifyContent="right" gap="21px" mr="28px" display={{ base: 'none', lg: 'flex', md: 'none', sm: 'none' }} w="24%">
          <InputGroup onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} transition="width 0.4s" width={isExpanded ? '224px' : '50px'} position="relative">
            <InputRightElement
              pointerEvents="none"
              children={<IconButton icon={<SearchIcon color="white" />} variant="ghost" _hover={{ bg: 'transparent' }} />}
            />
            <Input placeholder="Search" borderRadius="21px" pl={isExpanded ? '3rem' : '0.5rem'} pr={isExpanded ? '0.5rem' : '3rem'} />
          </InputGroup>

          <Box>
            <Menu>
              <MenuButton as={Button} variant="ghost" colorScheme="rgb(251,251,251)">
                <BsBell size="28px" />
              </MenuButton>
              <MenuList textAlign={"center"} >
                  <MenuItem color={"black"} pl={"11px"} textAlign={"center"} >notifactions</MenuItem>
                <MenuGroup title="notifications" h="28vh"> 
                </MenuGroup>
                <MenuDivider />
              </MenuList>
            </Menu>

            <Button onClick={toggleColorMode} variant="ghost" borderRadius="50px">
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Box>
        </Box>
      </Box>

      {/* /////////////////////////////////// modal ////////////////////////////////////////// */}
  
 {
              isOpen ? 
              (
                <Box pb={4}  mt={"42px"}   display={{ md: "block" }} bg={navTheme} w={"100%"} fontWeight={"50"} fontFamily={"cursive"} color={"white"}>
                  <Stack  as={"nav"} spacing={4}>
                    <Button onClick={onClose} borderRadius={"11px"} variant={"outline"}>
                      <Link to="/">Home</Link>
                    </Button>
                    <Button borderRadius={"11px"} onClick={onClose} variant={"outline"}>
                      <Link to="/">Movies</Link>
                    </Button>
                    <Button borderRadius={"11px"} onClick={onClose} variant={"outline"}>
                      <Link to="/">Shows</Link>
                    </Button>
                    <Button borderRadius={"11px"} onClick={onClose} variant={"outline"}>
                      <Link to="/">New & popular</Link>
                    </Button>
                    <Button borderRadius={"11px"} onClick={onClose} variant={"outline"}>
                      <Link to="/">My List</Link>
                    </Button>
                    <Box>
                      
                      <Button onClick={toggleColorMode}ml={"-42px"}  variant={"outline"}>
                      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                      </Button>
                    </Box>
                  </Stack>
                </Box>
              ) : null
            
               
            }


            {/* ////////////////////////////////////////////// */}
    </>
  );
};

export default Navbar;
