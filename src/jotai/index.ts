import { atom,useAtom } from 'jotai'
import { IItem } from '../components/Item/Item'


export const UsersData = atom<[IItem]| []>([])
export const TrackedUserData = atom<[IItem]| []>([])
export const UpdateTrackedUserData = atom<boolean>(false)