import clsxm from "@/util/clsxm";
import MainPage from "@/presentation/playtoriomAssignment/home/home";

export default function Home() {
  console.log("Success Home Page ✅");
  return (
    <>
        <main className={clsxm("bg-white")}>
          <MainPage />
        </main>
    </>
  );
}
