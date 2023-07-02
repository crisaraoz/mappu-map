import { Link } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Image,
  Flex,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import styles from "./NavBar.module.scss";
import logoImage from "../../assets/Logo_Mappu 1x1.png";
import { useState } from "react";
import flagJapon from "../../assets/japon1.png";
import flagKorea from "../../assets/korea2.png";
import flagChina from "../../assets/china1.png";
interface NavBarProps {
  onLocationFilter: (location: string) => void;
}

function NavBar({ onLocationFilter }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLocationFilter = (location: string) => {
    onLocationFilter(location);
    setIsOpen(false);
  };

  return (
    <nav className={styles.navBar}>
      <div className={styles.logo}>
        <a
          href="https://instagram.com/cris.araozz"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={logoImage} alt="Logo" className={styles.logoImage} />
        </a>
      </div>
      <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      <ul className={`${styles.navList} ${isOpen ? styles.open : ""}`}>
        <Menu>
          <MenuButton as={Link} _hover={{ textDecoration: "underline", textDecorationColor: "red" }}>
            Filtro por país
            <Box as={ChevronDownIcon} ml="2" />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleLocationFilter("all")}>
              <Flex align="center">
                <Text>Ver todos</Text>
              </Flex>
            </MenuItem>
            <MenuItem onClick={() => handleLocationFilter("Japon")}>
              <Flex align="center">
                <Image boxSize="20px" src={flagJapon} alt="Flag Japon" />
                <Text ml={2}>Japón</Text>
              </Flex>
            </MenuItem>
            <MenuItem onClick={() => handleLocationFilter("Korea")}>
              <Flex align="center">
                <Image boxSize="20px" src={flagKorea} alt="Flag Korea" />
                <Text ml={2}>Corea</Text>
              </Flex>
            </MenuItem>
            <MenuItem onClick={() => handleLocationFilter("China")}>
              <Flex align="center">
                <Image boxSize="20px" src={flagChina} alt="Flag China" />
                <Text ml={2}>China</Text>
              </Flex>
            </MenuItem>
          </MenuList>
        </Menu>
      </ul>
    </nav>
  );
}

export default NavBar;
