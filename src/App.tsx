import { AppLayout } from '@/components/AppLayout'
import { HeroSection } from '@/components/HeroSection'

const App = () => (
  <AppLayout
    hero={<HeroSection onSearch={() => {}} />}
    filter={<div className="h-12 bg-dark-bg" />}
    songList={<div className="h-96 bg-black" />}
  />
)

export default App
