import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '@/components/Header.jsx';
import { Button } from '@/components/ui/button';
import { MessageCircle, Users, Shield, Zap } from 'lucide-react';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>ChatApp - Connect, Communicate, Collaborate</title>
        <meta
          name="description"
          content="ChatApp is a modern messaging platform that brings people together. Start conversations, build communities, and stay connected with friends and colleagues."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <Header />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://horizons-cdn.hostinger.com/72207a69-41f4-459a-ac18-8d9dd7e3c68e/e98d22c82cf914a7943baf5561e797f9.png"
              alt="Modern chat interface showcasing ChatApp's sleek design and user-friendly messaging experience"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-teal-900/80"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-8">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Connect, Communicate,
                <br />
                <span className="bg-gradient-to-r from-blue-300 to-teal-300 bg-clip-text text-transparent">
                  Collaborate
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Experience seamless messaging with ChatApp. Join millions of users who trust us for secure, real-time communication.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link to="/signup">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold text-lg px-10 py-6 rounded-xl shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105"
                  >
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 font-bold text-lg px-10 py-6 rounded-xl shadow-xl transition-all"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-white/70 rounded-full animate-bounce"></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Why Choose ChatApp?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Built with modern technology to deliver the best messaging experience
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="group p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-blue-500/50 transition-shadow">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Real-Time Messaging</h3>
                <p className="text-gray-600 leading-relaxed">
                  Instant message delivery with typing indicators and read receipts
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group p-8 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl border border-teal-200 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-teal-500/50 transition-shadow">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Group Chats</h3>
                <p className="text-gray-600 leading-relaxed">
                  Create unlimited groups and channels for teams and communities
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-purple-500/50 transition-shadow">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Private</h3>
                <p className="text-gray-600 leading-relaxed">
                  End-to-end encryption keeps your conversations safe and private
                </p>
              </div>

              {/* Feature 4 */}
              <div className="group p-8 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border border-orange-200 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-orange-500/50 transition-shadow">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
                <p className="text-gray-600 leading-relaxed">
                  Optimized performance for smooth messaging on any device
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-blue-600 to-teal-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Join thousands of users already enjoying seamless communication with ChatApp
            </p>
            <Link to="/signup">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 font-bold text-lg px-12 py-6 rounded-xl shadow-2xl hover:shadow-white/30 transition-all transform hover:scale-105"
              >
                Create Your Free Account
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">ChatApp</span>
              </div>
              <p className="text-sm text-gray-400">
                © 2026 ChatApp. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;