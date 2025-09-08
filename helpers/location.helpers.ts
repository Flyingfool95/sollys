export async function getCity(lat: number, lng: number) {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
    const data = await res.json();
    return (
        (data.address.city || data.address.town || data.address.village) +
        ", " +
        data.address.country.substring(0, 3) +
        "."
    );
}
