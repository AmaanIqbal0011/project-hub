import NavBar from "@/components/Navbar";
import { Footer } from "@/components/ui/footer";

export default function Layout({children} : Readonly<{children:React.ReactNode}>){
    return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-white">
<NavBar/>
        {children}
        <Footer />
    </main>
    )
}