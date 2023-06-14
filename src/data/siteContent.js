import React from "react";

import { AiFillGithub } from "react-icons/ai";
import { HiComputerDesktop } from "react-icons/hi2";
const siteContent = [
  {
    Title: "Trait Ranker",
    Content: [
      {
        Title: "Selection",
        Description: "The users swipe cards depnding if they value the trait.",

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
        Title: "Ranking",
        Description: (
          <div>
            The user is presented with a series of one-to-one comparisons until
            a sorted list is created. The pairs are obtained using a
            sophisticated selction algorithm that was customized for this
            application.
          </div>
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
            Development, and Alogortihms. During my time there I studied
            <b>Dart</b>,<b>Javascript</b>,<b>C</b>, <b>C++</b>, <b>Java</b>, and
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
          />
        ),
      },
    ],
  },

  {
    Title: "Experience",
    Content: [
      {
        Title: "Grand Circus Coding Bootcamp - Teaching Assistant",
        Description:
          "Supported professional training for Dysis Software Engineers to learn new web technolgies. This included reviewing code, answering questions, and providing feedback.",
      },
      {
        Title: "Currant - Full Stack Software Engineer",
        Description:
          "Worked with founding team to create an E-commerce platform using React, Node.js, and AWS DynamoDB",
      },
      {
        Title: "Two Fish Software - Frond End Software Engineer",
        Description:
          " Used Angular to translate customer specifications to functional components for 10% of the website's components",
      },
      {
        Title: "Blue Cross Bleu Shield of Michigan - Software Engineer Intern",
        Description:
          "Designed and built a health assistant mobile app using React Native, Google Cloud Functions, and Dialog Flow",
      },
    ],
  },
  {
    Title: "Projects",
    Content: [
      {
        Title: "CalvinHacks 2020",
        Description: (
          <div>
            At CalvinHacks 2020, my team and I developed a restaurant-finding
            web app called Find Dine Online using <b>React</b>, <b>Python</b>,
            and the <b>Google Maps API</b>. Out of 40 teams, we were proud to
            place in the <b>finals</b>.
          </div>
        ),
        Embed: (
          <iframe
            src="https://www.linkedin.com/embed/feed/update/urn:li:share:6648997759674396672"
            height="100%"
            width="100%"
            frameborder="0"
            allowfullscreen=""
            title="CalvinHacks 2020"
          />
        ),
      },
      {
        Title: "Orderle",
        Description: (
          <div>
            I developed a Wordle-style trivia game using <b>React</b> that
            challenges players to test their knowledge daily of both "if" and
            "in what order".
          </div>
        ),
        Icons: [
          {
            Icon: <AiFillGithub />,
            Link: "https://github.com/NMaass/orderle",
          },
        ],
      },
      {
        Title: "SpartaHack 2023",
        Description: (
          <div>
            Along with my team at SpartaHack 2023, I created a web app called
            Ingredient Investigator that used optical character recognition to
            scan items at the store, look up their ingredints, and warn the user
            of any potentially harmful substancies. This was done using{" "}
            <b>React</b>, <b>Python</b>, and <b>Tesseract</b>.{" "}
          </div>
        ),
        Media:
          "https://media.licdn.com/dms/image/C5622AQH3UxlEd5LUvQ/feedshare-shrink_1280/0/1675386323777?e=1686787200&v=beta&t=0HmhhiCm7xeQCpGuHaIU51HtHStUQhw_Zoo-bxfOpxc",
        Icons: [
          {
            Icon: <AiFillGithub />,
            Link: "https://github.com/NMaass/IngredientInvestigator",
          },
        ],
      },
    ],
  },
];

export const sections = siteContent.map((item) => item.Title);

export default siteContent;
