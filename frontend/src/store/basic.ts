import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

type Store = {
    name: string;
    setName: (name: string) => void;
};

const useBasicStore = create<Store>()(
    persist(
        (set) => ({
            name: uuidv4(),
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
