
import { useState, useEffect } from "react";
import { Shield, Eye, Clock, Timer, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Index = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 47,
    seconds: 33
  });

  // Fake countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset timer when it reaches 0
          return { hours: 2, minutes: 47, seconds: 33 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fakeTestimonials = [
    {
      name: "@crypto_king_2024",
      avatar: "👑",
      amount: "R$ 47,320",
      text: "This changed my life. Made more in 3 days than my salary in 6 months.",
      time: "2 min ago"
    },
    {
      name: "@silent_money",
      avatar: "🔥",
      amount: "R$ 23,870",
      text: "INSANE method. My bank account went from R$ 300 to R$ 25k in 2 weeks.",
      time: "7 min ago"
    },
    {
      name: "@dark_profits",
      avatar: "💰",
      amount: "R$ 156,900",
      text: "Finally financial freedom. No more boss, no more 9-5 slavery.",
      time: "12 min ago"
    }
  ];

  const paymentProofs = [
    { amount: "R$ 12,450", time: "14:32", type: "PIX RECEIVED" },
    { amount: "R$ 8,900", time: "13:47", type: "PIX RECEIVED" },
    { amount: "R$ 25,670", time: "12:15", type: "PIX RECEIVED" },
    { amount: "R$ 7,340", time: "11:28", type: "PIX RECEIVED" }
  ];

  return (
    <div className="min-h-screen bg-matrix-black cyber-grid">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-electric-red/20 via-transparent to-electric-green/20" />
        
        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Warning Header */}
          <div className="text-center mb-6">
            <div className="inline-block bg-electric-yellow text-black px-4 py-2 text-sm font-bold animate-blink">
              ⚠️ CONFIDENTIAL ACCESS ⚠️
            </div>
          </div>

          {/* Main Headline */}
          <div className="text-center mb-8">
            <h1 className="font-cyber text-4xl md:text-7xl font-black text-white mb-4">
              <span className="glitch-text text-electric-red" data-text="ESCAPE THE">
                ESCAPE THE
              </span>
              <br />
              <span className="text-electric-green animate-pulse">
                MATRIX
              </span>
            </h1>
            
            <p className="text-xl md:text-3xl text-electric-yellow font-bold mb-2">
              MAKE R$ 1,000 - R$ 50,000 PER DAY
            </p>
            <p className="text-lg md:text-xl text-white/80 font-code">
              While Others Stay BROKE and TRAPPED
            </p>
          </div>

          {/* Countdown Timer */}
          <Card className="bg-matrix-dark border-electric-red border-2 p-6 mb-8 max-w-md mx-auto">
            <div className="text-center">
              <p className="text-electric-red font-bold text-sm mb-2 animate-blink">
                🚨 LIMITED TIME ACCESS 🚨
              </p>
              <div className="flex justify-center space-x-4 text-2xl font-cyber font-bold">
                <div className="text-electric-yellow">
                  {String(timeLeft.hours).padStart(2, '0')}
                  <span className="text-white text-sm block">HOURS</span>
                </div>
                <div className="text-electric-yellow">:</div>
                <div className="text-electric-yellow">
                  {String(timeLeft.minutes).padStart(2, '0')}
                  <span className="text-white text-sm block">MINS</span>
                </div>
                <div className="text-electric-yellow">:</div>
                <div className="text-electric-red animate-pulse">
                  {String(timeLeft.seconds).padStart(2, '0')}
                  <span className="text-white text-sm block">SECS</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Main CTA */}
          <div className="text-center mb-12">
            <Button 
              size="lg" 
              className="bg-electric-red hover:bg-electric-red/80 text-white font-cyber font-black text-xl md:text-3xl px-8 py-6 animate-pulse-red border-4 border-electric-yellow transform hover:scale-105 transition-all duration-200"
            >
              💎 ACCESS INSTANTLY 💎
              <br />
              <span className="text-sm">Before It's Too Late</span>
            </Button>
            <p className="text-electric-green text-sm mt-2 animate-blink">
              ✅ INSTANT ACCESS • ✅ 100% ANONYMOUS • ✅ NO TRACE
            </p>
          </div>
        </div>
      </div>

      {/* Payment Proofs Section */}
      <div className="py-12 bg-matrix-dark/50">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl md:text-4xl font-cyber font-bold text-electric-green mb-8">
            🔥 LIVE PAYMENT FEED 🔥
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {paymentProofs.map((proof, index) => (
              <Card key={index} className="bg-matrix-black border-electric-green p-4 animate-fade-in">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-electric-green font-bold text-lg">{proof.amount}</div>
                    <div className="text-white/60 text-sm">{proof.type}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-electric-yellow font-code">{proof.time}</div>
                    <div className="text-electric-green text-xs animate-pulse">✅ CONFIRMED</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Pain Points Section */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center text-3xl md:text-5xl font-cyber font-black text-electric-red mb-8">
              TIRED OF BEING A SLAVE?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-matrix-dark border-electric-red p-6">
                <h3 className="text-electric-yellow font-bold text-xl mb-4">😡 YOUR CURRENT REALITY:</h3>
                <ul className="text-white space-y-2 font-code">
                  <li>• Working 60+ hours for pennies</li>
                  <li>• Bills piling up every month</li>
                  <li>• No savings, living paycheck to paycheck</li>
                  <li>• Watching others get rich while you struggle</li>
                  <li>• Feeling trapped in the system</li>
                </ul>
              </Card>
              
              <Card className="bg-matrix-dark border-electric-green p-6">
                <h3 className="text-electric-green font-bold text-xl mb-4">💰 YOUR NEW REALITY:</h3>
                <ul className="text-white space-y-2 font-code">
                  <li>• Make R$ 1,000+ per day from home</li>
                  <li>• Work 2 hours, earn more than monthly salary</li>
                  <li>• Complete financial freedom</li>
                  <li>• Buy whatever you want, whenever you want</li>
                  <li>• Break free from the matrix</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-12 bg-matrix-dark/30">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl md:text-5xl font-cyber font-bold text-electric-yellow mb-8">
            REAL PEOPLE, REAL RESULTS
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {fakeTestimonials.map((testimonial, index) => (
              <Card key={index} className="bg-matrix-black border-electric-blue p-6">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">{testimonial.avatar}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-electric-green font-bold">{testimonial.name}</span>
                      <span className="text-electric-yellow font-code text-sm">{testimonial.time}</span>
                    </div>
                    <p className="text-white mb-2 font-code">{testimonial.text}</p>
                    <div className="text-electric-red font-bold">
                      💸 PROFIT: {testimonial.amount}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="py-8 bg-matrix-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center space-x-2 text-electric-green">
              <Shield className="w-6 h-6" />
              <span className="font-bold">100% ANONYMOUS</span>
            </div>
            <div className="flex items-center space-x-2 text-electric-yellow">
              <Eye className="w-6 h-6" />
              <span className="font-bold">NO TRACE</span>
            </div>
            <div className="flex items-center space-x-2 text-electric-red">
              <Check className="w-6 h-6" />
              <span className="font-bold">INSTANT RESULTS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-16 bg-gradient-to-t from-electric-red/20 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-cyber font-black text-white mb-4">
            LAST CHANCE TO ESCAPE
          </h2>
          <p className="text-xl text-electric-yellow mb-8 font-bold">
            The Matrix is closing this loophole FOREVER
          </p>
          
          <Button 
            size="lg" 
            className="bg-electric-green hover:bg-electric-green/80 text-black font-cyber font-black text-2xl md:text-4xl px-12 py-8 animate-pulse border-4 border-electric-yellow transform hover:scale-110 transition-all duration-300"
          >
            🚀 BREAK FREE NOW 🚀
            <br />
            <span className="text-lg">Before It's Too Late</span>
          </Button>
          
          <div className="mt-6 text-center">
            <p className="text-electric-red text-sm animate-blink font-bold">
              ⚠️ WARNING: Access will be TERMINATED in {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')} ⚠️
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-8 bg-matrix-black text-center">
        <p className="text-white/40 text-sm font-code">
          This site uses advanced encryption • Your identity remains completely anonymous
        </p>
      </div>
    </div>
  );
};

export default Index;
