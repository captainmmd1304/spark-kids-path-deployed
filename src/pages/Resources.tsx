import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, BookOpen, Users, Video, FileText, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Resources = () => {
  const articles = [
    {
      title: "Understanding Dyslexia: A Parent's Guide",
      description: "Learn about the signs, challenges, and effective support strategies for children with dyslexia.",
      category: "Reading & Learning"
    },
    {
      title: "Supporting Children with ADHD at Home",
      description: "Practical tips and routines to help your child manage attention and improve focus.",
      category: "Attention & Focus"
    },
    {
      title: "Managing Childhood Anxiety",
      description: "Evidence-based techniques to help your child cope with worry and build resilience.",
      category: "Emotional Well-being"
    },
    {
      title: "Creating an Inclusive Learning Environment",
      description: "How to adapt your home space to support diverse learning needs.",
      category: "General Support"
    }
  ];

  const videos = [
    {
      title: "Daily Mindfulness Exercises for Kids",
      duration: "12 min",
      description: "Simple breathing and relaxation techniques your child can practice anytime."
    },
    {
      title: "Multisensory Reading Strategies",
      duration: "18 min",
      description: "Interactive methods to make reading more engaging and effective."
    },
    {
      title: "Building Executive Function Skills",
      duration: "15 min",
      description: "Activities to strengthen planning, organization, and self-control."
    }
  ];

  const expertTips = [
    {
      expert: "Dr. Sarah Johnson, Educational Psychologist",
      tip: "Celebrate small victories every day. Progress isn't always linear, and recognizing effort builds confidence."
    },
    {
      expert: "Mark Stevens, Special Education Teacher",
      tip: "Create consistent routines with visual schedules. Predictability helps children feel secure and focused."
    },
    {
      expert: "Dr. Emily Chen, Child Psychiatrist",
      tip: "Practice patience and empathy. Your child isn't choosing to struggle—they need understanding and support."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-calm py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="mb-2 text-4xl font-bold">Parent Resources Hub</h1>
          <p className="text-muted-foreground">
            Expert guidance, educational materials, and community support for families.
          </p>
        </div>

        <Tabs defaultValue="articles" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="articles" className="gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Articles</span>
            </TabsTrigger>
            <TabsTrigger value="videos" className="gap-2">
              <Video className="h-4 w-4" />
              <span className="hidden sm:inline">Videos</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Community</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {articles.map((article, index) => (
                <Card key={index} className="p-6 shadow-card transition-all hover:shadow-soft hover:scale-105">
                  <div className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    {article.category}
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">{article.title}</h3>
                  <p className="mb-4 text-muted-foreground">{article.description}</p>
                  <Button variant="outline" className="gap-2">
                    Read More
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </Card>
              ))}
            </div>

            <Card className="p-8 shadow-soft">
              <div className="mb-6 flex items-center gap-3">
                <FileText className="h-6 w-6 text-secondary" />
                <h2 className="text-2xl font-bold">Expert Tips</h2>
              </div>
              <div className="space-y-6">
                {expertTips.map((item, index) => (
                  <div key={index} className="rounded-xl border-l-4 border-secondary bg-secondary/5 p-6">
                    <p className="mb-2 font-semibold text-secondary">{item.expert}</p>
                    <p className="text-muted-foreground italic">"{item.tip}"</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {videos.map((video, index) => (
                <Card key={index} className="overflow-hidden shadow-card transition-all hover:shadow-soft hover:scale-105">
                  <div className="aspect-video bg-gradient-to-br from-primary to-secondary"></div>
                  <div className="p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="rounded-full bg-accent/10 px-2 py-1 text-xs font-medium text-accent">
                        {video.duration}
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{video.title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">{video.description}</p>
                    <Button variant="outline" className="w-full gap-2">
                      <Video className="h-4 w-4" />
                      Watch Now
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <Card className="p-8 shadow-soft">
              <div className="mb-6 flex items-center gap-3">
                <Users className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Parent Community</h2>
              </div>
              <p className="mb-6 text-muted-foreground">
                Connect with other parents, share experiences, and find support from families 
                on similar journeys. Our moderated community provides a safe, welcoming space.
              </p>
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-6">
                  <h3 className="mb-2 text-lg font-semibold">Weekly Support Groups</h3>
                  <p className="mb-4 text-muted-foreground">
                    Join virtual meetups every Tuesday at 7 PM EST to connect with other parents 
                    and share strategies.
                  </p>
                  <Button className="gap-2">
                    Join Next Session
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                <div className="rounded-xl bg-secondary/5 p-6">
                  <h3 className="mb-2 text-lg font-semibold">Discussion Forums</h3>
                  <p className="mb-4 text-muted-foreground">
                    Browse topics, ask questions, and learn from the experiences of thousands 
                    of parents in our community.
                  </p>
                  <Button variant="outline" className="gap-2">
                    Browse Forums
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-accent to-accent/60 p-8 text-white shadow-soft">
              <h2 className="mb-4 text-2xl font-bold">Need Professional Help?</h2>
              <p className="mb-6 text-white/90">
                Connect with licensed educational psychologists, therapists, and learning 
                specialists who understand your child's unique needs.
              </p>
              <Button variant="secondary" size="lg" className="gap-2">
                Find a Professional
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Resources;
