import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link, Stack } from "@mui/material";

import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <Stack spacing={1} alignItems={"center"}>
        <div>
          <span>&copy; {new Date().getFullYear()} Ricardo A. F. da Silva</span>
        </div>
        <Link href="mailto:ricardoafdasilva@gmail.com">
          ricardoafdasilva@gmail.com
        </Link>
        <Link
          href="https://www.linkedin.com/in/ricardoafs/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon /> ricardoafs
        </Link>
      </Stack>
    </footer>
  );
};

export default Footer;
