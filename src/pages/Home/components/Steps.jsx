const Steps = () => {

  const data = [
    {
      imgPath: "/step1.png",
      title: (
        <>
          1. Pick <span className="text-primary">Your Plan</span>
        </>
      ),
      desc: "Find the perfect Cinema Crate subscription to match your movie and TV show cravings.",
    },
    {
      imgPath: "/step2.png",
      title: (
        <>
          2. Explore <span className="text-primary">Our Library</span>
        </>
      ),
      desc: "Dive into a world of entertainment with unlimited access to thousands of movies and TV shows.",
    },
    {
      imgPath: "/step3.png",
      title: (
        <>
          3. Start <span className="text-primary">Watching!</span>
        </>
      ),
      desc: "Grab your favourite snacks, sit back, relax, and get ready to be entertained by our handpicked selection.",
    },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-6 xl:gap-8 my-8 md:overflow-auto">
        {data.map((item) => (
          <div
            className="bg-dark px-6 py-8 rounded-lg xs:min-w-[23rem] w-full md:w-1/2"
            key={item.imgPath}
          >
            <img src={item.imgPath} alt={item.title} className="h-10" />
            <h4 className="text-xl font-medium my-4">{item.title}</h4>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;
