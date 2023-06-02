import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { FaHome, FaInfoCircle, FaEnvelope, FaCoins, FaSadTear, FaSmile } from "react-icons/fa";
import { Link } from "react-router-dom";

function AppBar() {
    return (
        <Box
            bg="#17b1a3"
            p={4}
            position="fixed"
            top={0}
            left={0}
            right={0}
            zIndex={9999}
        >
            <Flex justify="space-between" align="center">
                <Link to={"/"}>
                    <Button colorScheme="whiteAlpha">
                        <FaHome size={"28px"} /> Tracker
                        {/* <img src="https://www.batelec1.com.ph/asset/images/batelec1logowhite.png" ></img> */}
                    </Button>
                </Link>

                <Flex>
                    <Link to={"/expenses"}>
                        <Button colorScheme="whiteAlpha">
                            <FaSadTear size={"28px"} />
                        </Button>
                    </Link>
                    <Link to={"/incomes"}>
                        <Button colorScheme="whiteAlpha">
                            <FaSmile size={"28px"} />
                        </Button>
                    </Link>
                </Flex>
            </Flex>
        </Box >
    );
}

export default AppBar;
