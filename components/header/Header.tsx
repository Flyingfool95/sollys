import MyDatePicker from "../../islands/MyDatePicker.tsx";
import { ServerData } from "../../types/serverData.types.ts";
import MyLocationPicker from "./Location.tsx";
import Logo from "./Logo.tsx";

export default function Header({ data }: { data: ServerData }) {
    return (
        <>
            <header>
                <MyDatePicker />
                <Logo />
                <MyLocationPicker locationData={data.locationData} />
            </header>
        </>
    );
}
