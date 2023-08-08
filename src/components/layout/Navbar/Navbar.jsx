import React from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../ui/modals/modalSlice";
import SignOut from "@/api/auth/ui/SignOut";
import EmmeLogo from "public/EmmeLogo";
import { ColorModeSwitcher } from "@/components/ui/ColorModeSwitcher";

const Navbar = () => {
  const { authenticated } = useSelector((state) => state.auth);
  const { isOpen, onToggle } = useDisclosure();
  const dispatch = useDispatch();

  return (
    <Box p={3} paddingBottom={0}>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          minW="fit-content"
        >
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            <Link href="/">
              <Box>
                <EmmeLogo width={'30'} height={'30'} />
              </Box>
            </Link>
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={[2, 6, 6]}
        >
          <ColorModeSwitcher justifySelf="flex-end" />
          {authenticated ? (
            <SignOut />
          ) : (
            <Button
              id="login-button"
              size={["sm", "md"]}
              fontSize={"sm"}
              fontWeight={400}
              variant={"link"}
              onClick={() => {
                dispatch(openModal({ modalType: "SignIn" }));
              }}
            >
              Sign In
            </Button>
          )}
          {authenticated ? null : (
            <Button
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"pink.400"}
              size={["sm", "md"]}
              onClick={() => {
                dispatch(openModal({ modalType: "SignUp" }));
              }}
              _hover={{
                bg: "pink.300",
              }}
            >
              Sign Up
            </Button>
          )}
        </Stack>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav onClick={onToggle} />
      </Collapse>
    </Box>
  );
};

export default Navbar;
