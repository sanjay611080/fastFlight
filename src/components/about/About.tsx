const About = () => {
  return (
    <div className="relative w-full bg-black text-gray-300">

      <div
        className="relative w-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/background.svg')", 
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="relative w-full h-[100vh] flex flex-col justify-center items-center text-gray-300 space-y-12 z-0">
          <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FFB703] via-[#FF5353] to-[#652FFF]">
            The Complete Flight Details
          </h1>
          
          <img
            src="/logo.png" 
            alt="Logo"
            width={256} 
            height={256} 
            className="object-contain"
          />
          
          <p className="text-lg md:text-xl max-w-3xl text-center px-6">
            We provide seamless travel experiences for all your needs. From booking flights to assisting with travel logistics, our services ensure you have a smooth and hassle-free journey.
          </p>
          
          <h2 className="sm:block hidden text-2xl md:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#FFB703] via-[#FF5353] to-[#652FFF]">
            OUR COMMITMENT TO YOUR JOURNEY
          </h2>
        </div>

        <div className="relative pb-16 px-6 md:px-16 z-0">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
            
            <div className="relative w-full h-64 md:h-96 max-w-xl">
              <img
                src="/flight.webp" 
                alt="Travel Services"
                className="rounded-lg shadow-lg w-full h-full object-cover"
              />
            </div>

            <div className="text-center md:text-left max-w-2xl mx-auto md:ml-12">
              <p className="text-lg md:text-xl text-gray-300">
                We are dedicated to offering the best travel services tailored to your needs. Whether it's booking flights, organizing travel logistics, or ensuring a smooth journey, we prioritize your comfort and satisfaction.
              </p>

              <p className="mt-6 text-lg md:text-xl text-gray-300">
                Our expert team is committed to providing top-notch service, ensuring you enjoy seamless travel from start to finish. Whether you're flying for business or leisure, we make sure your experience is nothing less than exceptional.
              </p>
            </div>
          </div>
        </div>

      </div> 

    </div>
  );
};

export default About;
