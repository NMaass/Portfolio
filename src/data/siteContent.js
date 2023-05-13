import React from "react";
import headshot from ".././assets/headshot.jpg";
import { AiFillGithub } from "react-icons/ai";
import { HiComputerDesktop } from "react-icons/hi2";
const siteContent = [
  {
    Title: "Projects",
    Content: [
      {
        Title: "Trait Ranker",
        Description:
          "Here are some of my projects. Click on the project name to see more details.",

        Media: "https://i.imgur.com/7G5Jwbk.gif",
        MediaAlt: "Swiping cards on the selction screen of Trait Ranker",

        Icons: [
          {
            Icon: <AiFillGithub />,
            Link: "https://github.com/NMaass/trait-ranker",
          },
          {
            Icon: <HiComputerDesktop />,
            Link: "https://nmaass.github.io/trait-ranker/#/",
          },
        ],
      },
      {
        Title: "Wayne State University",
        Description: (
          <div>
            A graduate of Wayne State University with a bachelors in Computer
            Science. Through Wayne, I interned at <b>PoGo</b>, developing a
            Flutter app to make political information more accessible. My
            favorite classes were Human Computer Interaction, Mobile App
            Development, and Alogortihms. During my time there I studied{" "}
            <b>Dart</b>,<b>Javascript</b>,<b>C</b>, <b>C++</b>, <b>Java</b>, and{" "}
            <b>Python</b>. I also helped the Society of Computer Developers
            organize a hackathon
          </div>
        ),
        Embed: (
          <iframe
            src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7056415530605318144"
            height="100%"
            width="100%"
            frameBorder="0"
            allowFullScreen=""
            title="Embedded post"
          ></iframe>
        ),
      },
    ],
  },
  {
    Title: "Education",
    Content: [
      {
        Title: "Wayne State University",
        Description: (
          <div>
            A graduate of Wayne State University with a bachelors in Computer
            Science. Through Wayne, I interned at <b>PoGo</b>, developing a
            Flutter app to make political information more accessible. My
            favorite classes were Human Computer Interaction, Mobile App
            Development, and Alogortihms. During my time there I studied{" "}
            <b>Dart</b>,<b>Javascript</b>,<b>C</b>, <b>C++</b>, <b>Java</b>, and{" "}
            <b>Python</b>. I also helped the Society of Computer Developers
            organize a hackathon
          </div>
        ),
        Embed: (
          <iframe
            src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7056415530605318144"
            height="100%"
            width="100%"
            frameborder="0"
            allowfullscreen=""
            title="Embedded post"
          ></iframe>
        ),
      },
    ],
  },

  {
    Title: "Experience",
    Content: [
      {
        Title: "Grand Circus Coding Bootcamp",
        Description: "Feel free to reach out to me at my email:",
      },
    ],
  },
  {
    Title: "About Me",
    Content: [
      {
        Title: "CalvinHacks 2020",
        Description:
          "A software engineer with a passion for learning and creating. I am currently working at a startup called Trait Ranker. I am also a student at the University of Washington studying Computer Science and Applied Mathematics.",
        Media: headshot,
      },
    ],
  },
];

export const sections = siteContent.map((item) => item.Title);

export default siteContent;
