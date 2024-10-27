export interface Media {
    _id: string
    filename: string
    owner: string
    type: string
    path: string
    visible: boolean
    ext: string
    timestamp: Date
}

export interface Picture extends Media {}

export interface Video extends Media {}