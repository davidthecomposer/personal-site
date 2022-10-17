export interface Colors {
  [key: string]: string
}

export type ActiveTrack = {
  audioRef: HTMLAudioElement | null
  title: string
  year: string
}
