const TableProduction = () => {
  return (
    <div className="w-full flex flex-col gap-5 p-4 items-center">
      <div className="p-2  bg-blue-200 rounded-3xl w-full">
        <h2 className="text-xl">Jardin - Droite</h2>
        <div className=" w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-2">
            <div className="flex w-1/2 justify-between">
              <div className="w-[100px]">Carotte</div>
              <div className="w-[100px]">Nantaise</div>
              <div className="w-[100px]">1</div>
              <div className="w-[100px]">ligne</div>
              <div className="w-[100px]">3</div>
              <div className="w-[100px]">bottes</div>
            </div>
            <div>
              <div className="flex  w-full justify-around">
                <div>J</div>
                <div>F</div>
                <div>M</div>
                <div>A</div>
                <div>M</div>
                <div>J</div>
                <div>J</div>
                <div>A</div>
                <div>S</div>
                <div>O</div>
                <div>N</div>
                <div>D</div>
              </div>
              <div className="flex w-full justify-center">
                {Array.from({ length: 48 }).map((_, index) => (
                  <div key={index} className="bg-black w-2 h-3"></div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex w-full "></div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-2">
            <div className="flex w-3/5 justify-between gap-2">
              <div className="w-[100px]">Carotte</div>
              <div className="w-[100px]">Nantaise</div>
              <div className="w-[100px] text-right">1</div>
              <div className="w-[100px]">ligne</div>
              <div className="w-[100px] text-right">3</div>
              <div className="w-[100px]">bottes</div>
            </div>

            <div className="flex w-full justify-center">
              {Array.from({ length: 48 }).map((_, index) => (
                <div key={index} className="bg-black w-2 h-3"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableProduction;
