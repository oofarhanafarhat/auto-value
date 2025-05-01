 const Meter=[
     { name: "836M", Tiltle:"CARS FOR SALE" },
     { name: "736M", Tiltle: "DEALERS REVIEWS" },
    { name: "100M",Tiltle : "VISITORS PER DAY" },
    { name: "238M",Tiltle: "VERIFIED DEALERS" },
 ];

 export default function Modal() {
    return(
        <div className="bg-gray-200 py-20">
            <div className="max-w-7xl mx-auto px-4">
               
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {Meter.map((item) => (
                        <div key={item.name} className="flex flex-col items-center justify-center bg-gary-100 rounded-xl p-6 shadow-md">
                            <h3 className="text-3xl font-bold text-[#0C2340] mb-4">{item.name}</h3>
                            <p className="text-sm font-medium text-gray-500">{item.Tiltle}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
 }