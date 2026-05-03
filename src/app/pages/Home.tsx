import { Navbar } from '../components/Navbar';
import { SearchBar } from '../components/SearchBar';
import { TripCard } from '../components/TripCard';
import { TestimonialCard } from '../components/TestimonialCard';
import { Footer } from '../components/Footer';
import { popularTrips, testimonials } from '../data/trips';
import { Sparkles, Shield, Award, HeadphonesIcon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1673844970514-1f6f61356c2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Discover Morocco's
            <br />
            <span className="text-secondary">Hidden Treasures</span>
          </h1>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Experience authentic Moroccan adventures with expert guides and unforgettable memories
          </p>
          <SearchBar />
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8" id="trips">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Popular Destinations</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our handpicked collection of the most stunning destinations in Morocco
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularTrips.slice(0, 6).map((trip) => (
              <TripCard key={trip.id} {...trip} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/trips">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-xl">
                View All Destinations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Special Offers</h2>
            <p className="text-muted-foreground text-lg">Limited time deals on amazing experiences</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                  <span className="font-semibold">Summer Special</span>
                </div>
                <h3 className="text-3xl font-bold mb-3">Save up to 30% on Desert Tours</h3>
                <p className="text-white/90 mb-6">
                  Book your Sahara adventure now and get exclusive discounts on camel treks and luxury camps
                </p>
                <Button className="bg-white text-primary hover:bg-white/90">
                  Book Now
                </Button>
              </div>
              <Sparkles className="absolute right-8 top-8 w-24 h-24 text-white/10" />
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-border relative overflow-hidden">
              <div className="relative z-10">
                <div className="inline-block bg-secondary/10 px-4 py-2 rounded-full mb-4">
                  <span className="font-semibold text-secondary">Group Discount</span>
                </div>
                <h3 className="text-3xl font-bold mb-3 text-foreground">Travel with Friends & Save</h3>
                <p className="text-muted-foreground mb-6">
                  Groups of 4+ get 20% off on all mountain trekking packages. Perfect for adventure seekers!
                </p>
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Learn More
                </Button>
              </div>
              <Award className="absolute right-8 bottom-8 w-24 h-24 text-muted/20" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">What Our Travelers Say</h2>
            <p className="text-muted-foreground text-lg">
              Real experiences from real adventurers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose VoyageVert?</h2>
            <p className="text-muted-foreground text-lg">
              Your trusted partner for unforgettable Moroccan adventures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Safe & Secure</h3>
              <p className="text-muted-foreground text-sm">
                Licensed guides and secure payment methods
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Award Winning</h3>
              <p className="text-muted-foreground text-sm">
                Top-rated travel agency in Morocco
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
              <p className="text-muted-foreground text-sm">
                Always here to help during your journey
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Best Prices</h3>
              <p className="text-muted-foreground text-sm">
                Quality experiences at competitive rates
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
