import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Trophy, Star, TrendingUp, Calendar, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Mock data - in a real app, this would come from a database
  const stats = {
    totalActivities: 12,
    totalPoints: 340,
    currentStreak: 5,
    level: 3
  };

  const recentActivities = [
    { name: "Focus & Memory Game", score: 80, date: "Today", points: 80 },
    { name: "Reading Practice", score: 95, date: "Yesterday", points: 95 },
    { name: "Attention Exercise", score: 70, date: "2 days ago", points: 70 },
  ];

  const skills = [
    { name: "Reading", progress: 65, color: "primary" },
    { name: "Focus & Attention", progress: 80, color: "secondary" },
    { name: "Memory", progress: 55, color: "accent" },
    { name: "Emotional Skills", progress: 70, color: "success" },
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
          <h1 className="mb-2 text-4xl font-bold">Your Progress Dashboard</h1>
          <p className="text-muted-foreground">
            Track your growth and celebrate every achievement!
          </p>
        </div>

        {/* Stats Overview */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6 shadow-card transition-all hover:shadow-soft">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-primary/10 p-4">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Points</p>
                <p className="text-3xl font-bold">{stats.totalPoints}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-card transition-all hover:shadow-soft">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-accent/10 p-4">
                <Star className="h-8 w-8 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-3xl font-bold">{stats.currentStreak} days</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-card transition-all hover:shadow-soft">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-secondary/10 p-4">
                <Calendar className="h-8 w-8 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Activities Done</p>
                <p className="text-3xl font-bold">{stats.totalActivities}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-card transition-all hover:shadow-soft">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-success/10 p-4">
                <Award className="h-8 w-8 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Level</p>
                <p className="text-3xl font-bold">Level {stats.level}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Skills Progress */}
          <Card className="p-8 shadow-soft lg:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Skill Development</h2>
            </div>
            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-2 flex justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.progress}%</span>
                  </div>
                  <Progress value={skill.progress} className="h-3" />
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activities */}
          <Card className="p-8 shadow-soft">
            <h2 className="mb-6 text-2xl font-bold">Recent Activities</h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="rounded-xl border-2 border-border p-4 transition-all hover:border-primary hover:bg-primary/5"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="font-semibold">{activity.name}</h3>
                    <span className="rounded-full bg-success/10 px-2 py-1 text-xs font-medium text-success">
                      +{activity.points}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{activity.date}</span>
                    <span className="font-medium">Score: {activity.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Achievements Section */}
        <Card className="mt-8 p-8 shadow-soft">
          <h2 className="mb-6 text-2xl font-bold">Your Achievements</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-gradient-to-br from-primary to-primary/50 p-6 text-white">
              <div className="mb-2 flex items-center gap-2">
                <Star className="h-6 w-6" />
                <h3 className="text-lg font-semibold">First Steps</h3>
              </div>
              <p className="text-sm text-white/90">Completed your first activity</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-secondary to-secondary/50 p-6 text-white">
              <div className="mb-2 flex items-center gap-2">
                <Trophy className="h-6 w-6" />
                <h3 className="text-lg font-semibold">On Fire!</h3>
              </div>
              <p className="text-sm text-white/90">Maintained a 5-day streak</p>
            </div>
            <div className="rounded-2xl border-2 border-dashed border-muted p-6 text-muted-foreground">
              <div className="mb-2 flex items-center gap-2">
                <Award className="h-6 w-6" />
                <h3 className="text-lg font-semibold">Level Master</h3>
              </div>
              <p className="text-sm">Reach Level 5 to unlock</p>
            </div>
          </div>
        </Card>

        {/* Continue Learning CTA */}
        <div className="mt-8 text-center">
          <Link to="/activities">
            <Button size="lg" className="gap-2">
              Continue Learning
              <Star className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
