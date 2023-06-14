import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";
export const personalLinks = [
  {
    Icon: <AiFillGithub />,
    Link: "https://github.com/NMaass",
    Name: "Github",
  },
  {
    Icon: <FaLinkedin />,
    Link: "https://www.linkedin.com/in/nicholas-maassen-63ab53187/",
    Name: "LinkedIn",
  },
  {
    Icon: <HiDocumentText />,
    Link: process.env.PUBLIC_URL + "/Nicholas_Maassen_Resume.pdf",
    Name: "Resume",
  },
];
