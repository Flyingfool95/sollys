import MyDatePicker from "../../islands/MyDatePicker.tsx";
import MyLocationPicker from "./Location.tsx";
import Logo from "./Logo.tsx";

export default function Header() {
    return (
        <>
            <header>
                <MyDatePicker />
                <Logo />
                <MyLocationPicker/>
            </header>
        </>
    );
}
