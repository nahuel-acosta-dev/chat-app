export interface User{
    'id': number;
    "email": string,
    "first_name": string,
    "last_name":string
}

export interface Profile {
    "id": null,
    "user": null,
    "photo": null
  }

export interface ProfileUser{
    "id": number,
    "user": User,
    "photo": string | null
}