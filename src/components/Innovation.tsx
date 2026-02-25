import React from 'react';
import { Lightbulb, Rocket, Beaker, ArrowRight } from 'lucide-react';

const innovations = [
  {
    title: "Breakthrough Innovation",
    subtitle: "Shaping the Future",
    image: "https://images.unsplash.com/photo-1635048424329-a9bfb146d7aa?auto=format&fit=crop&q=80",
    description: "Our dedicated Innovation Team pushes boundaries beyond traditional product development, creating revolutionary spirits experiences.",
    stats: { value: "50+", label: "Patents" }
  },
  {
    title: "Sustainable Production",
    subtitle: "Eco-conscious Crafting",
    image: "https://images.unsplash.com/photo-1620286708322-684eba284b06?auto=format&fit=crop&q=80",
    description: "Leading the industry with drone technology and AI-driven farming practices for sustainable ingredient sourcing.",
    stats: { value: "40%", label: "Carbon Reduction" }
  },
  {
    title: "Digital Experience",
    subtitle: "Beyond the Bottle",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
    description: "Creating immersive digital experiences that blend traditional craftsmanship with cutting-edge technology.",
    stats: { value: "2M+", label: "Digital Interactions" }
  }
];

const pillars = [
  { icon: Lightbulb, text: "Research & Development", description: "Pioneering new flavors and techniques" },
  { icon: Rocket, text: "Market Leadership", description: "Setting industry standards" },
  { icon: Beaker, text: "Quality Control", description: "Uncompromising excellence" }
];

export default function Innovation() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-3xl mb-24">
          <span className="text-sm tracking-[0.3em] text-amber-700 mb-6 block">INNOVATION</span>
          <h2 className="text-5xl font-light text-gray-900 mb-8 leading-tight">
            Innovation is in our <span className="font-playfair italic">DNA</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-12">
            At Nativis, we're constantly pushing boundaries and exploring new possibilities. 
            Our dedication to innovation ensures we stay ahead of market trends while 
            maintaining the highest standards of quality and tradition.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <item.icon className="h-8 w-8 text-amber-700 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">{item.text}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Innovation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {innovations.map((item, index) => (
            <div key={index} className="group">
              <div className="relative h-80 mb-8 overflow-hidden rounded-xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center space-x-2 text-amber-300 mb-2">
                    <span className="w-8 h-[1px] bg-current"></span>
                    <span className="text-sm">{item.subtitle}</span>
                  </div>
                  <h3 className="text-2xl font-light">{item.title}</h3>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="block text-2xl font-semibold text-amber-700">{item.stats.value}</span>
                    <span className="text-sm text-gray-600">{item.stats.label}</span>
                  </div>
                  <a href="#" className="group/link flex items-center space-x-2 text-amber-700 hover:text-amber-800">
                    <span className="text-sm">Learn more</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center">
          <a 
            href="#" 
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-amber-700 text-sm tracking-wider text-amber-700 hover:bg-amber-700 hover:text-white transition-colors duration-300"
          >
            EXPLORE OUR INNOVATIONS
          </a>
        </div>
      </div>
    </section>
  );
}