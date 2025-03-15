import Image from "next/image";


export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-600 to-purple-700 p-40">
        <div className="absolute w-full h-full opacity-10">
          <Image fill src={'/images/hero-bg.jpg'} alt=""/>
        </div>
        <div className="w-4/5">
          <h1 className="text-7xl text-white text-center font-semibold">Predict your course success</h1>
          <p className="text-2xl text-indigo-100 text-center mt-5 px-8">Leverage AI-powered analytics to optimize enrollment strategies and maximize student engagement</p>
        </div>
        <div>
          
        </div>


      </main>
    </>
  );
}
