export type PersonModel = {
        id: string,
        name: {
          title: string,
          first: string,
          last: string
        },
        picture: {
          large: string,
          medium: string,
          thumbnail: string
        },
        email: string
}

export type EditPerson = {
        title: string,
        first: string,
        last: string,
        email: string
}