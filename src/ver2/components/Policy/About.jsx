import React from 'react'
import Button from "./Button";
import { Link } from "react-scroll";
import img from "../image/bg-1.png";
import Heading from "./Heading";
import  Carousel  from './Carousel';

const About = () => {
    let slides = [
      "https://scontent.fhan14-2.fna.fbcdn.net/v/t1.15752-9/387588644_1288226925229990_6918579842300424345_n.png?stp=dst-png_p320x320&_nc_cat=100&ccb=1-7&_nc_sid=510075&_nc_ohc=3arQNSFwEZAAX_iuSNq&_nc_ht=scontent.fhan14-2.fna&oh=03_AdTSmmpdtvf4KEoTl4Fd8jIPW730UPVE5j3oIInKLb218w&oe=655757FC",
      "https://scontent.fhan14-3.fna.fbcdn.net/v/t1.15752-9/393813129_851757156499793_3825131148838558737_n.png?stp=dst-png_p320x320&_nc_cat=103&ccb=1-7&_nc_sid=510075&_nc_ohc=bsxOeR_4v3EAX8MHozH&_nc_ht=scontent.fhan14-3.fna&oh=03_AdQgE8B57v-bZ2UqygLI59kZEWKhWfPgnHBmK57K1afhVQ&oe=65577E8C",
      "https://scontent.fhan14-2.fna.fbcdn.net/v/t1.15752-9/393490280_1312957019339502_7370173128942613241_n.png?stp=dst-png_p320x320&_nc_cat=108&ccb=1-7&_nc_sid=510075&_nc_ohc=37-awjPlK_YAX8Cm6C1&_nc_ht=scontent.fhan14-2.fna&oh=03_AdQS5OjwSBvVZVi7Ji1vhOykEYbZ9yNJpAojLeYRstX21Q&oe=65577CF0",
      "https://scontent.fhan14-1.fna.fbcdn.net/v/t1.15752-9/387493948_890949672390515_6926495495551206190_n.png?stp=dst-png_p320x320&_nc_cat=107&ccb=1-7&_nc_sid=510075&_nc_ohc=udycYDnLcpgAX9xRda_&_nc_ht=scontent.fhan14-1.fna&oh=03_AdTEsW20mdrfVsmQ0ZRxSF7PnxLBMwh51dnn7B0TGuqoIA&oe=65577286",
      "https://scontent.fhan14-1.fna.fbcdn.net/v/t1.15752-9/393749419_600768998728966_3230499522667329980_n.png?stp=dst-png_p320x320&_nc_cat=105&ccb=1-7&_nc_sid=510075&_nc_ohc=9PANNAByaz0AX_kUUOI&_nc_ht=scontent.fhan14-1.fna&oh=03_AdQk-hcwqobjYSuVYRmQnJRHSewjaSQ5ZEOtZjjM_Eu_wg&oe=65575E01",
    ];
  return (
    <div className=" md:min-h-screen flex flex-col-reverse md:flex-row items-center gap-5 md:mx-32 mx-5 mt-14">
      <div className=" w-full md:w-2/4">
        <Carousel slides={slides} />
      </div>

      <div className="w-full md:w-2/4 text-center space-y-2">
        <Heading title1="About" title2="Us?" />
        <p className=" text-lightText text-3xl">
          You want to know the future of you and your lover?, you want to have
          fun with a software that predicts your future, experience our
          artificial intelligence application, we are artificial intelligence
          software create future predictions, we will automatically generate
          your predictions, experience it, we will create future scenarios of
          love
        </p>

        <Link to="download" spy={true} smooth={true} duration={500}>
          <Button title="Download IOS" />
        </Link>
        <Link to="download" spy={true} smooth={true} duration={500}>
          <Button title="Download Android" />
        </Link>
      </div>
    </div>
  );
}

export default About
