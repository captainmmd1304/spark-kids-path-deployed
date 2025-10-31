import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Heart, Sparkles, Users, ArrowRight, Shield, BookOpen, LogIn, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user, signOut } = useAuth();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--secondary)/0.1),transparent_50%)]" />
        
        <div className="container relative mx-auto px-4 py-8 md:py-12">
          {/* User Status Bar */}
          <div className="mb-8 flex justify-end">
            {user ? (
              <Button onClick={signOut} variant="outline" className="gap-2">
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            ) : (
              <Link to="/auth">
                <Button variant="outline" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  Login / Sign Up
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="container relative mx-auto px-4 pb-20 md:pb-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Supporting Every Child's Journey</span>
            </div>
            
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Empowering Children to{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Thrive & Grow
              </span>
            </h1>
            
            <p className="mb-10 text-xl text-muted-foreground md:text-2xl">
              Early screening, interactive learning, and supportive resources for children with 
              dyslexia, ADHD, anxiety, and other learning challenges.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/screening">
                <Button size="lg" className="group gap-2 shadow-button transition-all hover:scale-105">
                  Start Free Screening
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/activities">
                <Button size="lg" variant="outline" className="gap-2 transition-all hover:scale-105">
                  <Sparkles className="h-4 w-4" />
                  Try an Activity
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-foreground">How We Help</h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive support designed with care and backed by research
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="group p-8 shadow-card transition-all hover:shadow-soft hover:scale-105">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Brain className="h-7 w-7 text-primary" />
            </div>
            <h3 className="mb-3 text-2xl font-semibold">Early Screening</h3>
            <p className="text-muted-foreground">
              Interactive assessments to identify potential learning differences early, 
              enabling timely support and intervention.
            </p>
          </Card>

          <Card className="group p-8 shadow-card transition-all hover:shadow-soft hover:scale-105">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10">
              <Sparkles className="h-7 w-7 text-secondary" />
            </div>
            <h3 className="mb-3 text-2xl font-semibold">Fun Learning Activities</h3>
            <p className="text-muted-foreground">
              Engaging, multisensory games and exercises tailored to build reading, 
              attention, and emotional skills.
            </p>
          </Card>

          <Card className="group p-8 shadow-card transition-all hover:shadow-soft hover:scale-105">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
              <Heart className="h-7 w-7 text-accent" />
            </div>
            <h3 className="mb-3 text-2xl font-semibold">Progress Tracking</h3>
            <p className="text-muted-foreground">
              Visual dashboards showing growth and achievements, celebrating every 
              milestone along the journey.
            </p>
          </Card>

          <Card className="group p-8 shadow-card transition-all hover:shadow-soft hover:scale-105">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-success/10">
              <Users className="h-7 w-7 text-success" />
            </div>
            <h3 className="mb-3 text-2xl font-semibold">Parent Resources</h3>
            <p className="text-muted-foreground">
              Expert guidance, community support, and educational materials to help 
              families navigate challenges together.
            </p>
          </Card>

          <Card className="group p-8 shadow-card transition-all hover:shadow-soft hover:scale-105">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Shield className="h-7 w-7 text-primary" />
            </div>
            <h3 className="mb-3 text-2xl font-semibold">Safe & Accessible</h3>
            <p className="text-muted-foreground">
              Designed with accessibility in mind, featuring dyslexia-friendly fonts, 
              high contrast, and privacy protection.
            </p>
          </Card>

          <Card className="group p-8 shadow-card transition-all hover:shadow-soft hover:scale-105">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10">
              <BookOpen className="h-7 w-7 text-secondary" />
            </div>
            <h3 className="mb-3 text-2xl font-semibold">Personalized Plans</h3>
            <p className="text-muted-foreground">
              Custom activity recommendations and learning paths adapted to each 
              child's unique needs and pace.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="relative overflow-hidden bg-gradient-to-br from-primary to-secondary p-12 text-white shadow-soft">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-4xl font-bold">Ready to Get Started?</h2>
            <p className="mb-8 text-lg text-white/90">
              Join families who are empowering their children to overcome challenges 
              and discover their strengths.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/screening">
                <Button size="lg" variant="secondary" className="gap-2 shadow-button">
                  Begin Screening
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/resources">
                <Button size="lg" variant="outline" className="gap-2 border-white/20 bg-white/10 text-white hover:bg-white/20">
                  Parent Resources
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Index;
