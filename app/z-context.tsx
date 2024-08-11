import { create } from "zustand";

type User = {
    id: string;
    username: string;
    avatar: string;
    diamondQty: number;
    googleId: string;
};

export type UserInRoom = {
    id: string;
    socketId: string;
};

type Store = {
    SET_USER: (newUser: User) => void;
    user: User;

    SET_USERINROOM: (newUserInRoom: UserInRoom[]) => void;
    userInRoom: UserInRoom[];
};

const useStore = create<Store>((set) => ({
    SET_USER: (newUser: User) => set({ user: newUser }),
    user: {
        id: '',
        username: '',
        avatar: '',
        diamondQty: 0,
        googleId: ''
    },
    SET_USERINROOM: (newUserInRoom: UserInRoom[]) => set({ userInRoom: newUserInRoom }),
    userInRoom: []
}));

export default useStore;
