import VogueLogo from '../assets/VogueNestLogo.jpeg';
const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm ">
        <div>
          <img src={VogueLogo} alt="" className="mb-5 w-32  aspect-2/0.9" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Repudiandae quod saepe, inventore aliquid aperiam distinctio non nam
            commodi eligendi quis debitis laborum officia cupiditate, tenetur
            odit voluptas ipsa quos quas?
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600 ">
            <li>Home</li>
            <li>ABout us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl  font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600 ">
            <li>+44-788-4833-423 </li>
            <li>info@voguenest.co.uk</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-cnter">
          Copyright 2024@ vouguenest.com - All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
