import React from 'react';
import Title from '../components/Title';
import about1 from '../assets/vogueAbout.webp';
import about2 from '../assets/vogueaAbout2.webp';
import NewsLetter from '../components/NewsLetter';
const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1="ABOUT" text2="US" />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={about1} alt="" className="w-full md:w-[450px]" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            At VogueNest, we believe fashion is more than just clothes; it's a
            form of self-expression, creativity, and confidence. We are your
            ultimate online destination for curated, trend-setting pieces that
            cater to every style, personality, and occasion.
          </p>
          <p>
            VogueNest is more than just a store; it's a community of fashion
            lovers. We are dedicated to providing an exceptional shopping
            experience, from easy navigation to fast, reliable shipping and
            responsive customer service.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our Mission Our is to bring you the latest in fashion, from timeless
            classics to bold, trendsetting designs. We carefully select each
            piece in our collection to ensure it meets our standards for
            quality, comfort, and individuality. At VogueNest, we empower you to
            embrace your unique style and elevate your wardrobe with every
            purchase.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>
            At VogueNest, we are committed to delivering exceptional quality in
            every piece we offer. We understand that fashion is more than just
            about appearances it’s about the way it feels, fits, and lasts.
            That’s why we go above and beyond to ensure that every item in our
            collection meets the highest standards of craftsmanship and
            durability.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className='text-gray-600'>
            we prioritize your convenience to ensure an effortless and enjoyable
            shopping experience from start to finish. We know that modern
            shopping should be simple, fast, and secure. Therefore we’ve
            designed every aspect of our store with you in mind.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service :</b>
          <p className='text-gray-600'>
            We understand that every customer is unique, and we strive to
            provide personalized assistance tailored to your specific needs.
            Whether you have questions about a product, need styling advice, or
            require help with your order, our knowledgeable team is just a click
            away. We're here to listen and provide solutions that work for you.
          </p>
        </div>
      </div>
      <NewsLetter/>
    </div>
  );
};

export default About;
