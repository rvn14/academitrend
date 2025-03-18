import SelectForm from "@/components/Entry";
import Hero from "@/components/Hero";

export default function Home() {



  return (
    <main className="relative w-full font-inter">
      <Hero />
      <div className="w-full h-screen bg-white flex flex-col justify-center items-center p-8">
        <h1 className="text-4xl font-bold pb-6 text-center"> Select your University and the degree program </h1>
        <div className="bg-white w-4/5 rounded-2xl shadow-sm p-8">
        <SelectForm />
        </div>
      </div>
      
    </main>
  );
}
