import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Store = {
    name: null | string;
    setName: (name: string) => void;
};

const useBasicStore = create<Store>()(
    persist(
        (set) => ({
            name: null,
            setName: (name) => {
                set({ name });
            },
        }),
        {
            name: "basic", // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        }
    )
);

export default useBasicStore;
