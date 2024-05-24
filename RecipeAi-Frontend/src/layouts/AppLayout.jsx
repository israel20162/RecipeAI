import { createSignal } from "solid-js";
import Header from "../components/Header";
import { A } from "@solidjs/router";
import SearchBar from "../components/SearchBar";
function AppLayout(props) {
    // Placeholder for active tab logic
    const [activeTab, setActiveTab] = createSignal("home");
    const [isDark, setIsDark] = createSignal(true);

    // Toggle dark mode function
    const toggleDarkMode = () => {
        setIsDark(!isDark())
    };
    return (
        <div class="h-screen overflow-y-scroll relative bg-pink-50 dark:bg-slate-900"
            classList={{ 'dark': isDark() }}>
            {/* Top Navigation */}
            <Header darkMode={toggleDarkMode} />
            <div class="dark:bg-slate-900 "> <SearchBar />
                {/* Main Content */}
                <main class=" bg-pink-50 dark:bg--900 h-screen ">
                    <div class="flex-grow overflow-y-auto px-auto dark:bg-gray-900 mb-12">
                        {props.children}
                        {/* Content goes here */}
                        {/* {activeTab() === "home" && <div>Home Content</div>}
                {activeTab() === "settings" && <div>Settings Content</div>} */}
                        {/* Add other tab contents as needed */}
                    </div>
                </main>
            </div>




            <footer class="bg-white  fixed bottom-0 w-full dark:bg-slate-950 dark:text-white shadow-lg flex p-4 justify-around border-t dark:border-black">
                <A href="/" activeClass="text-blue-500" end>
                    Home
                </A>
                <A href="/recipe/create" activeClass="text-blue-500">
                    Create
                </A>
                <A href="/recipe/generate" activeClass="text-blue-500" end>
                    Generate
                </A>
                <button onClick={() => setActiveTab("settings")} class={`${activeTab() === "settings" ? "text-blue-600" : ""}`}>
                    Settings
                </button>

            </footer>
        </div>
    );
}

export default AppLayout;
