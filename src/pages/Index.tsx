import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import ExpertiseTree from "@/components/ExpertiseTree";
import ProjectsSection from "@/components/ProjectsSection";
import ProjectDistribution from "@/components/ProjectDistribution";
import EducationSection from "@/components/EducationSection";
import AchievementsSection from "@/components/AchievementsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ExpertiseTree />
      <ProjectDistribution />
      <ProjectsSection />
      <EducationSection />
      <AchievementsSection />
      <ContactSection />
      <footer className="py-8 text-center border-t border-border">
        <p className="text-sm text-muted-foreground">
          © 2026 Sayali Jadhav. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;
