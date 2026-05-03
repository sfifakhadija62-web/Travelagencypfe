import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { popularTrips } from '../data/trips';
import { reviews } from '../data/reviews';
import { MapPin, Clock, Star, Calendar, Users } from 'lucide-react';
import { Button } from '../components/ui/button';

export function TripDetails() {
  const { id } = useParams();
  const trip = popularTrips.find(t => t.id === Number(id));
  const tripReviews = reviews.filter(r => r.tripId === Number(id));

  if (!trip) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-12 text-center">
          <h1 className="text-4xl font-bold">Trip not found</h1>
          <Link to="/trips">
            <Button className="mt-6 bg-primary hover:bg-primary/90">
              Back to Trips
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const itinerary = [
    { day: 1, title: 'Arrival & Welcome', description: 'Meet your guide, hotel check-in, and welcome dinner.' },
    { day: 2, title: 'City Exploration', description: 'Full day guided tour of main attractions with lunch included.' },
    { day: 3, title: 'Adventure Activities', description: 'Hiking, cultural experiences, and local cuisine tasting.' },
    { day: 4, title: 'Departure', description: 'Breakfast, last-minute shopping, and airport transfer.' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20">
        <div className="relative h-[500px]">
          <img
            src={trip.image}
            alt={trip.destination}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-2 text-white mb-3">
                <MapPin className="w-5 h-5" />
                <span>{trip.country}</span>
              </div>
              <h1 className="text-5xl font-bold text-white mb-4">{trip.destination}</h1>
              <div className="flex items-center gap-6 text-white">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{trip.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span>{trip.rating} ({trip.reviews} reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
                <h2 className="text-2xl font-bold mb-4">About This Trip</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Embark on an unforgettable journey to {trip.destination}, one of Morocco's most captivating destinations.
                  This carefully curated experience combines authentic cultural immersion with breathtaking natural beauty.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our expert local guides will take you off the beaten path to discover hidden gems, share fascinating stories,
                  and ensure you experience the true essence of Moroccan hospitality. From traditional cuisine to stunning landscapes,
                  every moment is designed to create lasting memories.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
                <h2 className="text-2xl font-bold mb-6">Travel Program</h2>
                <div className="space-y-6">
                  {itinerary.map((item) => (
                    <div key={item.day} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                          {item.day}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Day {item.day}: {item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-md">
                <h2 className="text-2xl font-bold mb-6">Reviews ({tripReviews.length})</h2>
                <div className="space-y-6">
                  {tripReviews.map((review) => (
                    <div key={review.id} className="border-b border-border pb-6 last:border-0">
                      <div className="flex items-start gap-4">
                        <img
                          src={review.avatar}
                          alt={review.userName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{review.userName}</h4>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm mb-2">{review.date}</p>
                          <p className="text-foreground">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-8 shadow-xl sticky top-24">
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Price per person</p>
                  <p className="text-4xl font-bold text-primary">${trip.price}</p>
                </div>

                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="w-5 h-5" />
                    <span>{trip.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="w-5 h-5" />
                    <span>Multiple dates available</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Users className="w-5 h-5" />
                    <span>Max 15 people</span>
                  </div>
                </div>

                <Link to={`/booking/${trip.id}`}>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-xl text-lg">
                    Book Now
                  </Button>
                </Link>

                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-semibold mb-3">What's Included</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Professional guide</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Accommodation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>All meals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Transportation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Activities & entrance fees</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
