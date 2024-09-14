import React from 'react';
import Title from '../components/Title';
import contactUs from '../assets/contactUs.webp';
import NewsLetter from '../components/NewsLetter';

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1="CONTACT" text2="US" />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 ">
        <img src={contactUs} alt="" className="w-full max-w-[480px]" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            89 Morewick road, <br />
            Manchester Piccadilly, M32,YT4
          </p>
          <p className="text-gray-500">
            Tel: (732-932-9672) <br /> Email: admin@voguenest.co.uk{' '}
          </p>
          <p className="font-semibold text-xl text-gray-600">
            {' '}
            Careers at VogueNest
          </p>
          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Expore Jobs</button>
          <p></p>
        </div>
      </div>
      <NewsLetter/>
    </div>
  );
};

export default Contact;
