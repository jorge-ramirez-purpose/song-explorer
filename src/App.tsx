import { AppLayout } from '@/components/AppLayout'

const App = () => (
  <AppLayout
    hero={<div className="h-64 bg-dark-border" />}
    filter={<div className="h-12 bg-dark-bg" />}
    songList={<div className="h-96 bg-black" />}
  />
)

export default App
