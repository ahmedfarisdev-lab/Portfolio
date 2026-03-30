import { Navbar }            from '@/components/layout/Navbar'
import { Footer }            from '@/components/layout/Footer'
import { HeroSection }       from '@/components/sections/HeroSection'
import { AboutSection }      from '@/components/sections/AboutSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { ClientsSection }    from '@/components/sections/ClientsSection'
import { ContactSection }    from '@/components/sections/ContactSection'
import { RevealInit }        from '@/components/ui/RevealInit'

export default function HomePage() {
  return (
    <>
      <Navbar showWorksLink />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ClientsSection />
        <ContactSection />
      </main>
      <Footer />
      <RevealInit />
    </>
  )
}
