export interface IUsuario {
    picture: {
        large: string,
        medium: string,
        thumbnail: string
    },
    name: {
        title: string,
        first: string,
        last: string
    },
    email: string,
    location: {
        country: string
    }
}