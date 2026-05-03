import { Link } from 'react-router-dom';
import { MapPin, Clock, Star } from 'lucide-react';
import { Button } from './ui/button';

interface TripCardProps {
  id: number;
  image: string;
  destination: string;
  country: string;
  duration: string;
  price: number;
  rating: number;
  reviews: number;
}

export function TripCard({ id, image, destination, country, duration, price, rating, reviews }: TripCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={destination}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold">{rating}</span>
          <span className="text-muted-foreground text-sm">({reviews})</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-1">{destination}</h3>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{country}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{duration}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Starting from</p>
            <p className="text-2xl font-bold text-primary">${price}</p>
          </div>
          <Link to={`/trip/${id}`}>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
