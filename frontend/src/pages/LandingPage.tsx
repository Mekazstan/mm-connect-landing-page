import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Users, Zap, Award, Star, TrendingUp, Shield, Heart } from 'lucide-react';
import Navbar from '../components/Navbar';

const LandingPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const api_endpoint = 'http://127.0.0.1:8000/waitlist/'
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(api_endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log("Success:", data);
      setIsSubmitted(true);
      setEmail("");

      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error("Error:", error);
      alert("This email already exists in our database. Try with a different email.");
    }
  };


  return (
    <div className="min-h-screen">
      <Navbar transparent />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-mint-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-float mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-lavender-100 rounded-full text-primary-700 text-sm font-medium">
                <Zap className="h-4 w-4 mr-2" />
                Launching Soon - Join the Waitlist
              </div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Learn from the
              <span className="bg-gradient-to-r from-primary-600 to-lavender-600 bg-clip-text text-transparent block">
                Best Tech Mentors
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Connect with experienced developers, designers, and tech professionals. 
              Get personalized guidance, accelerate your learning, and achieve your career goals.
            </p>

            <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-12">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitted}
                  className="bg-gradient-to-r from-primary-500 to-lavender-500 text-white px-8 py-4 rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-200 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitted ? (
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Joined!
                    </div>
                  ) : (
                    <div className="flex items-center">
                      Join Waitlist
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </div>
                  )}
                </button>
              </div>
            </form>

            <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary-500" />
                1,000+ Early Users
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 mr-2 text-yellow-500" />
                500+ Expert Mentors
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-mint-500" />
                100% Secure
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Getting started with your learning journey is simple and straightforward
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Choose Your Path',
                description: 'Tell us what you want to learn and your current skill level',
                icon: Users,
                color: 'from-primary-500 to-primary-600'
              },
              {
                step: '02',
                title: 'Find Your Mentor',
                description: 'Browse expert mentors and book sessions that fit your schedule',
                icon: Star,
                color: 'from-mint-500 to-mint-600'
              },
              {
                step: '03',
                title: 'Start Learning',
                description: 'Join one-on-one sessions and track your progress with gamified features',
                icon: TrendingUp,
                color: 'from-lavender-500 to-lavender-600'
              }
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <div className="text-6xl font-bold text-gray-100 mb-4">{item.step}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>

                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-8 w-8 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits for Mentors */}
      <section id="mentors" className="py-20 bg-gradient-to-br from-primary-50 to-lavender-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Share Your Expertise,
                <span className="bg-gradient-to-r from-primary-600 to-lavender-600 bg-clip-text text-transparent block">
                  Earn While Teaching
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join our community of expert mentors and help shape the next generation of tech professionals while building your personal brand.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  'Set your own hourly rates and schedule',
                  'Build your reputation with student reviews',
                  'Earn money sharing your knowledge',
                  'Access exclusive mentor resources and training'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-mint-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <div className="flex items-center space-x-4 mb-6">
                  <img 
                    src="https://images.pexels.com/photos/32379723/pexels-photo-32379723/free-photo-of-confident-woman-in-black-hijab-smiling-indoors.jpeg?auto=compress&cs=tinysrgb&w=150" 
                    alt="Mentor" 
                    className="w-16 h-16 rounded-2xl object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Aleekhan Alimat</h4>
                    <p className="text-gray-600">Senior React Developer</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-mint-100 to-mint-200 rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold text-mint-700">₦2,000</div>
                    <div className="text-sm text-mint-600">Per Hour</div>
                  </div>
                  <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold text-primary-700">4.9</div>
                    <div className="text-sm text-primary-600">Rating</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>This month's earnings</span>
                  <span className="font-semibold text-gray-900">#200,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits for Learners */}
      <section id="learners" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-semibold text-gray-900">Your Learning Journey</h4>
                  <div className="text-2xl">🚀</div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">React Fundamentals</span>
                    <span className="text-mint-500 font-semibold">Completed</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-mint-500 to-mint-600 h-2 rounded-full w-full"></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Advanced Hooks</span>
                    <span className="text-primary-500 font-semibold">In Progress</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full w-3/4"></div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-yellow-500" />
                      <span className="text-gray-700">7-day streak</span>
                    </div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-lavender-600 bg-clip-text text-transparent">
                      Level 5
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Accelerate Your
                <span className="bg-gradient-to-r from-primary-600 to-lavender-600 bg-clip-text text-transparent block">
                  Learning Journey
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Get personalized guidance from industry experts and track your progress with our gamified learning platform.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  'One-on-one mentoring sessions',
                  'Personalized learning paths',
                  'Progress tracking with badges and levels',
                  'Flexible scheduling that fits your life'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-mint-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-mint-50 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Community Says
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of learners and mentors who are already part of our growing community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Jide Timi',
                role: 'Frontend Developer',
                content: 'The mentorship I received helped me land my dream job at a tech startup. The personalized guidance was invaluable!',
                avatar: 'https://images.pexels.com/photos/32414786/pexels-photo-32414786/free-photo-of-stylish-male-portrait-in-lagos-studio.jpeg?auto=compress&cs=tinysrgb&w=150',
                rating: 5
              },
              {
                name: 'Suliyat Ogunlade',
                role: 'UX Designer',
                content: 'As a mentor, I love helping others grow while building my own reputation. The platform makes it so easy to connect with learners.',
                avatar: 'https://images.pexels.com/photos/32417404/pexels-photo-32417404/free-photo-of-portrait-of-a-woman-smiling-outdoors-in-vibrant-dress.jpeg?auto=compress&cs=tinysrgb&w=150',
                rating: 5
              },
              {
                name: 'Okoro Davis',
                role: 'Backend Engineer',
                content: 'The gamified learning approach kept me motivated throughout my journey. I actually looked forward to each session!',
                avatar: 'https://images.pexels.com/photos/31712654/pexels-photo-31712654/free-photo-of-smiling-african-man-black-and-white-portrait.jpeg?auto=compress&cs=tinysrgb&w=150',
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                
                <div className="flex items-center space-x-3">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-2xl object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-lavender-500 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">MentorMatch</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Connecting learners with expert mentors to accelerate careers in tech. 
                Join our community and unlock your potential.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span className="text-gray-400">Made for you</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#how-it-works" className="hover:text-white transition-colors duration-200">How It Works</a></li>
                <li><a href="#mentors" className="hover:text-white transition-colors duration-200">For Mentors</a></li>
                <li><a href="#learners" className="hover:text-white transition-colors duration-200">For Learners</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 MentorMatch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;