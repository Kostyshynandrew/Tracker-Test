import { atom,useAtom } from 'jotai'
import { IItem } from '../components/Item/Item'


export const UsersData = atom<[IItem] | []>([])
export const TrackedUserData = atom<{[key: string]: string}>({})
export const UpdateTrackedUserData = atom<boolean>(false)