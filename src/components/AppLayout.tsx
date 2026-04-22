import { ReactNode } from "react"

type TProps = {
  hero: ReactNode
  filter: ReactNode
  songList: ReactNode
}

export const AppLayout = ({ hero, filter, songList }: TProps) => (
  <main className="min-h-screen bg-black font-sans text-white">
    {hero}
    <section>
      {filter}
      {songList}
    </section>
  </main>
)
