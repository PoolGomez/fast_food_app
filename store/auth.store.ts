import { getCurrentUser } from '@/lib/appwrite';
import { User } from '@/type';
import { create } from 'zustand';

type AuthState = {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;

    setIsAuthenticated: (value: boolean) => void;
    setUser:(user: User | null) => void;
    setLoading:(loading:boolean) => void;

    fetchAuthenticatedUser: ()=>Promise<void>
}

const useAuthStore = create<AuthState>((set) => ({

    isAuthenticated:false,
    user:null,
    isLoading: true,

    setIsAuthenticated:(value)=>set({isAuthenticated: value}),

    setUser:(user)=>set({user}),
    setLoading:(value)=>set({isLoading: value}),

    fetchAuthenticatedUser: async ()=> {
        set({isLoading:true});
        try {
            const userCurrent = await getCurrentUser();
            if(userCurrent) {
                set({isAuthenticated: true, user: userCurrent as unknown as User }) //as User
            }else {
                set({isAuthenticated: false, user: null})
            }
        } catch (error) {
            console.log('fetchAuthenticatedUser error', error);
            set({isAuthenticated: false, user: null})
        }finally{
            set({isLoading:false})
        }
    }

//   bears: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
//   updateBears: (newBears) => set({ bears: newBears }),
}))

export default useAuthStore;