import React from 'react'
import Button from './Button';
import { Link } from 'react-scroll';
import img from '../image/bg-1.png'

const Home = () => {
  return (
    <div className=" min-h-[70vh] flex flex-col md:flex-row md:justify-between items-center md:mx-32 mx-5 mt-10">
      <div className=" md:w-2/4 text-center">
        <h2 className=" text-5xl font-semibold leading-tight">
          Start with
          <span className="text-brightGreen"> Future Love</span>
        </h2>
        <p className=" text-lightText mt-5 text-start text-4xl">
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

      <div className=" w-full md:w-2/4">
        <img src={img} alt="img" />
      </div>
    </div>
  );
}

export default Home
