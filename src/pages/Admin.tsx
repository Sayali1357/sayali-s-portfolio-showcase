import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Home } from "lucide-react";
import AdminHero from "@/components/admin/AdminHero";
import AdminSkills from "@/components/admin/AdminSkills";
import AdminProjects from "@/components/admin/AdminProjects";
import AdminEducation from "@/components/admin/AdminEducation";
import AdminAchievements from "@/components/admin/AdminAchievements";
import AdminSocials from "@/components/admin/AdminSocials";
import AdminTechTags from "@/components/admin/AdminTechTags";

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/login");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-foreground">Loading...</div>;
  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <h1 className="font-display text-xl font-bold text-foreground">Portfolio Admin</h1>
        <div className="flex items-center gap-3">
          <a href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
            <Home size={16} /> View Site
          </a>
          <button onClick={signOut} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive transition-colors">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="bg-secondary border border-border flex-wrap h-auto gap-1">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="tags">Tech Tags</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="socials">Socials</TabsTrigger>
          </TabsList>
          <TabsContent value="hero"><AdminHero /></TabsContent>
          <TabsContent value="tags"><AdminTechTags /></TabsContent>
          <TabsContent value="skills"><AdminSkills /></TabsContent>
          <TabsContent value="projects"><AdminProjects /></TabsContent>
          <TabsContent value="education"><AdminEducation /></TabsContent>
          <TabsContent value="achievements"><AdminAchievements /></TabsContent>
          <TabsContent value="socials"><AdminSocials /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
