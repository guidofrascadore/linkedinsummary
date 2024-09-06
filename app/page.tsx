'use client';

import { useState } from 'react'
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ReloadIcon, MagicWandIcon } from "@radix-ui/react-icons"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { JSX, SVGProps } from "react"

import Markdown from 'react-markdown'

import { generateLinkedInSummary } from './actions';

export default function Home() {
  const [jobTitle, setJobTitle] = useState('')
  const [yearsOfExperience, setYearsOfExperience] = useState('')
  const [industry, setIndustry] = useState('')
  const [keySkills, setKeySkills] = useState('')
  const [education, setEducation] = useState('')
  const [achievements, setAchievements] = useState('')
  const [careerGoals, setCareerGoals] = useState('')
  const [target, setTarget] = useState('')
  const [cta, setCta] = useState('')
  const [toneOfVoice, setToneOfVoice] = useState('')
  const [isFirstPerson, setIsFirstPerson] = useState(true)
  const [generatedText, setGeneratedText] = useState('')
  const [isLoading, setIsLoading] = useState(false)


  const handleRewrite = async () => {
    setIsLoading(true)
    try {
      const { text } = await generateLinkedInSummary({
        jobTitle,
        yearsOfExperience: parseInt(yearsOfExperience) || 0,
        industry,
        keySkills: keySkills.split(',').map(skill => skill.trim()),
        education,
        achievements: achievements.split(',').map(achievement => achievement.trim()),
        careerGoals,
        target,
        cta,
        toneOfVoice,
        isFirstPerson
      });

      const formattedText = text.replace(/\n/g, '\n\n');
      setGeneratedText(formattedText)

    } catch (error) {
      console.error('Error generating text:', error)
      setGeneratedText('An error occurred while generating the text. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const [url, setUrl] = useState("")
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) {
      setError("Please enter a valid URL")
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      // Simulating an API call with a timeout

      //const formattedText = text.replace(/\n/g, '\n\n');
      //setGeneratedText(formattedText)

      // Replace this with your actual scraping logic
      setResult("Profile content scraped successfully!")
    } catch (err) {
      setError("An error occurred while scraping the profile")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      {/* <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background px-4 sm:px-6">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <FilePenIcon className="h-6 w-6 text-primary" />
          <span className="text-lg font-medium">LinkedIn Summary Generator</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Upgrade
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header> */}

      <div className="text-center py-8 bg-white mt-24">
        <h1 className="text-7xl font-bold text-black">Linked<span className="bg-black rounded-md px-3 text-white">In</span> Summary <br /> Generator</h1>
        <p className="mt-6 text-xl text-gray-600">Craft your standout LinkedIn profile with AI-powered summaries - instantly and free.</p>
      </div>

      <main className="flex-1 px-4 py-8 sm:px-6 md:py-12">
        <div className="mx-auto grid max-w-4xl gap-8">
          {/*<Card className="bg-black dark:bg-white w-full mx-auto">
             <CardHeader>
              <CardTitle>Linked Profile Scraper</CardTitle>
              <CardDescription>Enter a profile URL to scrape its content</CardDescription>
            </CardHeader> 
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                <div className="space-y-2">
                  <Label htmlFor="profile-url" className="text-zinc-300">Get data from your linkedin profile</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="profile-url"
                      type="url"
                      placeholder="https://example.com/profile"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      disabled={isLoading}
                      className="flex-grow bg-zinc-700 text-white placeholder-zinc-500 border-zinc-900"
                    />
                    <Button 
                        type="submit" 
                        disabled={isLoading} 
                        variant="outline"
                        className="bg-zinc-800 hover:bg-zinc-100 border-zinc-900 text-white px-4 py-2 rounded-md flex items-center justify-center min-w-[180px]"
                      >
                      {isLoading ? (
                        <>
                          <ReloadIcon className="h-4 w-4 animate-spin mr-2" />
                          Scraping...
                        </>
                      ) : (
                        <>
                          <MagicWandIcon className="h-4 w-4 mr-2" />
                          Scrape this
                        </>
                      )
                      }
                      <span className="sr-only">Scrape Profile</span>
                    </Button>
                  </div>
                </div>
              </form>

              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {result && (
                <Alert className="mt-4">
                  <AlertDescription>{result}</AlertDescription>
                </Alert>
              )}
            </CardContent>
            
          </Card>*/}

          <Card>
            <CardHeader>
              <CardTitle>Generate your LinkedIn summary</CardTitle>
              <CardDescription>
                Enter your professional details below and let our AI-powered tool generate a LinkedIn summary for you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="job-title" className="text-sm font-medium">Job Title</label>
                    <Input
                      id="job-title"
                      placeholder="Senior Software Engineer"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="years-of-experience" className="text-sm font-medium">Years of Experience</label>
                    <Input
                      id="years-of-experience"
                      placeholder="8"
                      value={yearsOfExperience}
                      onChange={(e) => setYearsOfExperience(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="industry" className="text-sm font-medium">Industry</label>
                    <Input
                      id="industry"
                      placeholder="AI and Machine Learning"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="education" className="text-sm font-medium">Education</label>
                    <Input
                      id="education"
                      placeholder="MS in Computer Science"
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="key-skills" className="text-sm font-medium">Key Skills (comma-separated)</label>
                  <Textarea
                    id="key-skills"
                    placeholder="Python, TensorFlow, Cloud Computing, Agile Methodologies"
                    value={keySkills}
                    onChange={(e) => setKeySkills(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="achievements" className="text-sm font-medium">Achievements (comma-separated)</label>
                  <Textarea
                    id="achievements"
                    placeholder="Led a team that increased model accuracy by 30%, Reduced infrastructure costs by 25%"
                    value={achievements}
                    onChange={(e) => setAchievements(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="career-goals" className="text-sm font-medium">Career Goals</label>
                  <Textarea
                    id="career-goals"
                    placeholder="To lead innovative AI projects in a cutting-edge tech company"
                    value={careerGoals}
                    onChange={(e) => setCareerGoals(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="target" className="text-sm font-medium">Target Audience</label>
                    <Input
                      id="target"
                      placeholder="Tech recruiters and AI project managers"
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="cta" className="text-sm font-medium">Call to Action</label>
                    <Input
                      id="cta"
                      placeholder="Connect with me to discuss AI innovation opportunities"
                      value={cta}
                      onChange={(e) => setCta(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="tone-of-voice" className="text-sm font-medium">Tone of Voice</label>
                    <Select value={toneOfVoice} onValueChange={setToneOfVoice}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tone of voice" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="confident">Confident</SelectItem>
                        <SelectItem value="approachable">Approachable</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center space-x-2 mt-6">
                      <Switch
                        id="person-switch"
                        checked={isFirstPerson}
                        onCheckedChange={setIsFirstPerson}
                      />
                      <Label htmlFor="person-switch">
                        {isFirstPerson ? "First Person" : "Third Person"}
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button onClick={handleRewrite} disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generate Summary'}
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="mx-auto grid max-w-4xl gap-8 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Result</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="space-y-4 prose prose-gray dark:prose-invert">
                  {generatedText && (
                    <Markdown>{generatedText}</Markdown>
                  )}
                </div>
              </div>
            </CardContent>
            {/* <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Copy</Button>
              <Button>Save</Button>
            </CardFooter> */}
          </Card>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 LinkedIn Summary Generator. <a href="https://www.guidofrascadore.it">Guido Frascadore</a> - All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="https://www.linkedin.com/in/guidofrascadore/" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Linkedin
          </Link>
          <Link href="https://businessrevealed.substack.com/" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Sign up for Newsletter
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function FilePenIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  )
}