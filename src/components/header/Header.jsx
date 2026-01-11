import Dropdown from "./Dropdown";

export default function Header() {

    return (
        <header className="bg-gray-800 shadow-md sticky top-0 z-50 m-auto">
            <div className="max-w-screen-sm mx-auto flex justify-between items-center h-16 px-4">
                <div className="text-white">
                    <h6 className="font-semibold">ID: 0305943</h6>
                    <span className="text-sm text-gray-300">Admin</span>
                </div>
                {/* Right: Team Dropdown */}
                <Dropdown />
            </div>
        </header>
    );
}
