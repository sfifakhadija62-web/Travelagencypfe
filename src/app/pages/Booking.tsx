import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { popularTrips } from '../data/trips';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Calendar, Users, CreditCard, Banknote } from 'lucide-react';

export function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const trip = popularTrips.find(t => t.id === Number(id));

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    date: '',
    numberOfPeople: 1,
    paymentMethod: 'credit_card'
  });

  const totalPrice = trip ? trip.price * formData.numberOfPeople : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Booking confirmed!\nTrip: ${trip?.destination}\nTotal: $${totalPrice}\nPayment: ${formData.paymentMethod}`);
    navigate('/dashboard/user');
  };

  if (!trip) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-12 text-center">
          <h1 className="text-4xl font-bold">Trip not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Complete Your Booking</h1>
            <p className="text-muted-foreground">You're almost there! Fill in your details to confirm.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-md">
                <h2 className="text-2xl font-bold mb-6">Traveler Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="date">Travel Date *</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="date"
                        type="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="mt-2 pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="people">Number of People *</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="people"
                        type="number"
                        min="1"
                        max="15"
                        required
                        value={formData.numberOfPeople}
                        onChange={(e) => setFormData({ ...formData, numberOfPeople: parseInt(e.target.value) })}
                        className="mt-2 pl-10"
                      />
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-6 mt-8">Payment Method</h2>

                <div className="space-y-4 mb-6">
                  <label className="flex items-center gap-4 p-4 border-2 border-border rounded-xl cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="credit_card"
                      checked={formData.paymentMethod === 'credit_card'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="w-5 h-5 text-primary"
                    />
                    <CreditCard className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-semibold">Credit / Debit Card</p>
                      <p className="text-sm text-muted-foreground">Pay securely online</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-4 p-4 border-2 border-border rounded-xl cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="w-5 h-5 text-primary"
                    />
                    <Banknote className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-semibold">Cash Payment</p>
                      <p className="text-sm text-muted-foreground">Pay on arrival</p>
                    </div>
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-xl text-lg"
                >
                  Confirm Booking - ${totalPrice}
                </Button>
              </form>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-md sticky top-24">
                <h3 className="font-semibold text-lg mb-4">Booking Summary</h3>

                <img
                  src={trip.image}
                  alt={trip.destination}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />

                <h4 className="font-semibold text-xl mb-2">{trip.destination}</h4>
                <p className="text-muted-foreground text-sm mb-4">{trip.duration}</p>

                <div className="space-y-3 py-4 border-y border-border">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price per person</span>
                    <span className="font-semibold">${trip.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Number of people</span>
                    <span className="font-semibold">{formData.numberOfPeople}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold text-primary">${totalPrice}</span>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Free cancellation up to 48 hours before departure
                  </p>
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
