import { useCallback } from "preact/hooks";

export default function ClearStorageButton() {
    const handleClear = useCallback(() => {
        try {
            localStorage.clear();
        } catch (err) {
            console.error("Failed to clear localStorage", err);
        }
    }, []);

    return (
        <button type="button" onClick={handleClear}>
            Clear Local Storage
        </button>
    );
}
