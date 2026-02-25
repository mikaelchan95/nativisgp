import React from 'react';
import { TrendingUp, BarChart, Globe, Target } from 'lucide-react';

export default function Growth() {
  return (
    <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <span className="text-sm tracking-[0.3em] text-amber-700 mb-6 block">GROWTH & VISION</span>
          <h2 className="text-4xl font-light text-gray-900 mb-8">
            Driving Sustainable <span className="font-playfair italic">Growth</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Our strategic vision combines market expansion with unwavering commitment to 
            premium quality and sustainability, ensuring long-term value creation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {[
            {
              icon: TrendingUp,
              title: "Market Expansion",
              description: "Strategic growth in key markets worldwide",
              stat: "25+",
              statLabel: "New Markets in 2024"
            },
            {
              icon: BarChart,
              title: "Revenue Growth",
              description: "Consistent financial performance and returns",
              stat: "18%",
              statLabel: "YoY Growth"
            },
            {
              icon: Globe,
              title: "Global Reach",
              description: "Expanding presence in emerging markets",
              stat: "150+",
              statLabel: "Countries"
            },
            {
              icon: Target,
              title: "Strategic Goals",
              description: "Clear targets for sustainable growth",
              stat: "2030",
              statLabel: "Vision Target"
            }
          ].map((item, index) => (
            <div 
              key={index} 
              className="group bg-white p-8 rounded-xl border border-gray-100 hover:border-amber-200 transition-all duration-300 hover:shadow-[0_0_30px_rgba(251,191,36,0.1)]"
            >
              <div className="flex items-center justify-between mb-6">
                <item.icon className="h-8 w-8 text-amber-700" />
                <div className="text-right">
                  <span className="block text-2xl font-semibold text-amber-700">{item.stat}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">{item.statLabel}</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm tracking-[0.3em] text-amber-700 mb-4 block">OUR APPROACH</span>
            <h3 className="text-4xl font-light text-gray-900 mb-8">
              Strategic Growth <span className="font-playfair italic">Framework</span>
            </h3>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              We're focused on strategic expansion while maintaining our premium positioning 
              in the global spirits market. Our approach combines organic growth with 
              carefully selected strategic acquisitions.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "Premium Portfolio Development",
                description: "Expanding our luxury and ultra-premium offerings through innovative product development and strategic acquisitions.",
                number: "01"
              },
              {
                title: "Market Share Expansion",
                description: "Strategic entry and growth in high-potential markets, focusing on premium positioning and local partnerships.",
                number: "02"
              },
              {
                title: "Innovation-led Growth",
                description: "Pioneering new categories and consumption occasions through cutting-edge research and development.",
                number: "03"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-amber-200 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-start gap-8">
                  <span className="text-4xl font-light text-amber-700/30 font-playfair">{item.number}</span>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}