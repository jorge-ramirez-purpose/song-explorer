import heroDesktop from '../../assets/yousician-hero.png'
import heroDesktop2x from '../../assets/yousician-hero@2x.png'
import heroDesktop3x from '../../assets/yousician-hero@3x.png'
import heroMobile from '../../assets/yousician-hero-mobile.png'
import heroMobile2x from '../../assets/yousician-hero-mobile@2x.png'
import heroMobile3x from '../../assets/yousician-hero-mobile@3x.png'
import { SearchBar } from '@/components/SearchBar'
import { useFilterStore } from '@/store/useFilterStore'

export const HeroSection = () => {
  const searchKey = useFilterStore((state) => state.searchKey)

  return (
  <div className="relative w-full overflow-hidden">
    <picture>
      <source
        media="(max-width: 768px)"
        srcSet={`${heroMobile} 1x, ${heroMobile2x} 2x, ${heroMobile3x} 3x`}
      />
      <img
        src={heroDesktop}
        srcSet={`${heroDesktop} 1x, ${heroDesktop2x} 2x, ${heroDesktop3x} 3x`}
        alt=""
        className="w-full object-cover"
      />
    </picture>

    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-white font-black text-2xl md:text-4xl uppercase tracking-tight">
        New Songs Delivered Every Week
      </h1>
      <p className="text-white/80 text-sm md:text-base max-w-md">
        Here are the most recent additions to the Yousician App. Start playing today!
      </p>
      <SearchBar key={searchKey} />
    </div>
  </div>
  )
}
