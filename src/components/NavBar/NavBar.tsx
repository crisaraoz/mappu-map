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
  onLocationFilter: (location: string | null) => void;
}

function NavBar({ onLocationFilter }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const flagMap: { [key: string]: string | null } = {
    "Ver todos": null,
    Japon: flagJapon,
    Korea: flagKorea,
    China: flagChina,
  };
  // Define selectedFilter so that icon can be a string or null.
  const [selectedFilter, setSelectedFilter] = useState<{
    label: string;
    icon: string | null;
  }>({ label: "Filtro por país", icon: null });

  const handleLocationFilter = (location: string | null) => {
    setSelectedFilter({ label: location ?? "Filtro por país", icon: flagMap[location ?? ""] });
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
          <MenuButton
            as={Link}
            _hover={{ textDecoration: "underline", textDecorationColor: "red" }}
          >
            <Box width="150px" display="flex" alignItems="center">
              {selectedFilter.icon && (
                <Image
                  boxSize="20px"
                  src={selectedFilter.icon}
                  alt={`Flag ${selectedFilter.label}`}
                />
              )}
              <Text ml={2}>{selectedFilter.label}</Text>
              <Box as={ChevronDownIcon} ml="2" />
            </Box>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleLocationFilter("Ver todos")}>
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
