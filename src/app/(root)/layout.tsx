import NavBar from "@/components/Navbar";

export default function Layout({children} : Readonly<{children:React.ReactNode}>){
    return (
    <main className="text-2xl">
<NavBar/>
        {children}
    </main>
    )
}