import {ProfileUser} from './profile';

interface Participant {
    admin: boolean,
    profile: ProfileUser
}

export interface Group{
    id: number,
    chat_group_name: string,
    creator_user:ProfileUser,
    description: string,
    photo: string | null,
    users: Array<Participant>
}

export interface ChatGroupType{
    chat_group: Group
}

export interface ChatType{
    id: number,
    chat_name: string,
    message: string,
    send: ProfileUser,
    receive: ProfileUser
}
