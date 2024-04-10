const PackageMenu = ({ genre, activeGenreIndex, setActiveGenreIndex }) => {
  return (
    <div className="border border-primary rounded-lg flex items-center xs:flex-row flex-col">
      {genre.map((g, index) => (
        <>
          <div
            className={`py-2 px-6 text-center transition ease-in-out duration-200 w-full xs:w-auto ${
              activeGenreIndex === index
                ? "bg-primary text-dark2 font-medium"
                : "cursor-pointer hover:bg-dark"
            } ${
              index === 0 ? "rounded-l-lg xs:rounded-r-none rounded-r-lg" : ""
            } ${
              index === genre.length - 1
                ? "rounded-r-lg xs:rounded-l-none rounded-l-lg"
                : ""
            }`}
            onClick={() => setActiveGenreIndex(index)}
            key={g}
          >
            {g}
          </div>
          {index !== genre.length - 1 && (
            <div
              key={g + "divider"}
              className={
                (activeGenreIndex === index || activeGenreIndex === index + 1
                  ? `invisible`
                  : `text-white`) + " hidden xs:block"
              }
            >
              |
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default PackageMenu;
