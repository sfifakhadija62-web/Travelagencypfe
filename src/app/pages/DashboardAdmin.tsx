import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { popularTrips } from '../data/trips';
import { users } from '../data/users';
import { bookings } from '../data/bookings';
import { reviews } from '../data/reviews';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  LayoutDashboard, MapPin, Users as UsersIcon, Calendar, MessageSquare,
  CreditCard, LogOut, Home, Plus, Edit, Trash2, DollarSign
} from 'lucide-react';

export function DashboardAdmin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddTrip, setShowAddTrip] = useState(false);
  const [newTrip, setNewTrip] = useState({
    destination: '',
    country: '',
    duration: '',
    price: 0,
    description: '',
    image: ''
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddTrip = () => {
    alert(`Trip "${newTrip.destination}" added successfully!`);
    setShowAddTrip(false);
    setNewTrip({ destination: '', country: '', duration: '', price: 0, description: '', image: '' });
  };

  const handleDeleteTrip = (id: number, name: string) => {
    if (confirm(`Delete trip "${name}"?`)) {
      alert(`Trip "${name}" deleted!`);
    }
  };

  const handleDeleteUser = (id: number, name: string) => {
    if (confirm(`Delete user "${name}"?`)) {
      alert(`User "${name}" deleted!`);
    }
  };

  const handleUpdateBookingStatus = (id: number, status: string) => {
    alert(`Booking #${id} status updated to: ${status}`);
  };

  const handleDeleteReview = (id: number) => {
    if (confirm('Delete this review?')) {
      alert(`Review deleted!`);
    }
  };

  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 bg-white border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-semibold text-xl text-primary">VoyageVert</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
              activeTab === 'dashboard' ? 'bg-primary text-white' : 'hover:bg-muted'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('trips')}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
              activeTab === 'trips' ? 'bg-primary text-white' : 'hover:bg-muted'
            }`}
          >
            <MapPin className="w-5 h-5" />
            <span>Trips</span>
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
              activeTab === 'users' ? 'bg-primary text-white' : 'hover:bg-muted'
            }`}
          >
            <UsersIcon className="w-5 h-5" />
            <span>Users</span>
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
              activeTab === 'bookings' ? 'bg-primary text-white' : 'hover:bg-muted'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Bookings</span>
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
              activeTab === 'reviews' ? 'bg-primary text-white' : 'hover:bg-muted'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>Reviews</span>
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
              activeTab === 'payments' ? 'bg-primary text-white' : 'hover:bg-muted'
            }`}
          >
            <CreditCard className="w-5 h-5" />
            <span>Payments</span>
          </button>
        </nav>

        <div className="p-4 border-t border-border">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors mb-2"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user?.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
          </div>
        </header>

        <div className="p-6">
          {activeTab === 'dashboard' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm text-muted-foreground">Total Bookings</h3>
                    <Calendar className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-4xl font-bold text-primary">{bookings.length}</p>
                  <p className="text-sm text-green-600 mt-2">+12% from last month</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm text-muted-foreground">Total Users</h3>
                    <UsersIcon className="w-8 h-8 text-secondary" />
                  </div>
                  <p className="text-4xl font-bold text-secondary">{users.length}</p>
                  <p className="text-sm text-green-600 mt-2">+5% from last month</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm text-muted-foreground">Revenue</h3>
                    <DollarSign className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-4xl font-bold text-primary">${totalRevenue}</p>
                  <p className="text-sm text-green-600 mt-2">+18% from last month</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm text-muted-foreground">Active Trips</h3>
                    <MapPin className="w-8 h-8 text-secondary" />
                  </div>
                  <p className="text-4xl font-bold text-secondary">{popularTrips.length}</p>
                  <p className="text-sm text-muted-foreground mt-2">Available destinations</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h3 className="font-bold text-lg mb-4">Recent Bookings</h3>
                  <div className="space-y-3">
                    {bookings.slice(0, 5).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between pb-3 border-b border-border last:border-0">
                        <div>
                          <p className="font-semibold">{booking.userName}</p>
                          <p className="text-sm text-muted-foreground">{booking.tripName}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">${booking.totalPrice}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h3 className="font-bold text-lg mb-4">Recent Reviews</h3>
                  <div className="space-y-3">
                    {reviews.slice(0, 5).map((review) => (
                      <div key={review.id} className="pb-3 border-b border-border last:border-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold">{review.userName}</p>
                          <span className="text-yellow-400">{'★'.repeat(review.rating)}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.comment.substring(0, 80)}...</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'trips' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Manage Trips</h2>
                <Button
                  onClick={() => setShowAddTrip(true)}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add New Trip
                </Button>
              </div>

              {showAddTrip && (
                <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
                  <h3 className="font-bold text-lg mb-4">Add New Trip</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Destination</Label>
                      <Input
                        value={newTrip.destination}
                        onChange={(e) => setNewTrip({ ...newTrip, destination: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Country</Label>
                      <Input
                        value={newTrip.country}
                        onChange={(e) => setNewTrip({ ...newTrip, country: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Duration</Label>
                      <Input
                        value={newTrip.duration}
                        onChange={(e) => setNewTrip({ ...newTrip, duration: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Price ($)</Label>
                      <Input
                        type="number"
                        value={newTrip.price}
                        onChange={(e) => setNewTrip({ ...newTrip, price: Number(e.target.value) })}
                        className="mt-2"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Image URL</Label>
                      <Input
                        value={newTrip.image}
                        onChange={(e) => setNewTrip({ ...newTrip, image: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <Button onClick={handleAddTrip} className="bg-primary hover:bg-primary/90 text-white">
                      Save Trip
                    </Button>
                    <Button onClick={() => setShowAddTrip(false)} variant="outline">
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-4">Destination</th>
                      <th className="text-left p-4">Country</th>
                      <th className="text-left p-4">Duration</th>
                      <th className="text-left p-4">Price</th>
                      <th className="text-left p-4">Rating</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {popularTrips.map((trip) => (
                      <tr key={trip.id} className="border-b border-border">
                        <td className="p-4 font-semibold">{trip.destination}</td>
                        <td className="p-4">{trip.country}</td>
                        <td className="p-4">{trip.duration}</td>
                        <td className="p-4">${trip.price}</td>
                        <td className="p-4">{trip.rating} ⭐</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteTrip(trip.id, trip.destination)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-4">Name</th>
                      <th className="text-left p-4">Email</th>
                      <th className="text-left p-4">Phone</th>
                      <th className="text-left p-4">Role</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-border">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <span className="font-semibold">{user.name}</span>
                          </div>
                        </td>
                        <td className="p-4">{user.email}</td>
                        <td className="p-4">{user.phone}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.role === 'admin' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4">
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteUser(user.id, user.name)}
                            disabled={user.role === 'admin'}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Manage Bookings</h2>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-4">ID</th>
                      <th className="text-left p-4">User</th>
                      <th className="text-left p-4">Trip</th>
                      <th className="text-left p-4">Date</th>
                      <th className="text-left p-4">People</th>
                      <th className="text-left p-4">Total</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-border">
                        <td className="p-4">#{booking.id}</td>
                        <td className="p-4">{booking.userName}</td>
                        <td className="p-4">{booking.tripName}</td>
                        <td className="p-4">{booking.date}</td>
                        <td className="p-4">{booking.numberOfPeople}</td>
                        <td className="p-4 font-bold text-primary">${booking.totalPrice}</td>
                        <td className="p-4">
                          <select
                            value={booking.status}
                            onChange={(e) => handleUpdateBookingStatus(booking.id, e.target.value)}
                            className="border border-border rounded-lg px-3 py-1 text-sm"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="p-4">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Manage Reviews</h2>
              <div className="grid grid-cols-1 gap-4">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-2xl p-6 shadow-md">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <img
                          src={review.avatar}
                          alt={review.userName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold">{review.userName}</h4>
                            <span className="text-yellow-400">{'★'.repeat(review.rating)}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Trip: {review.tripId}</p>
                          <p className="text-foreground">{review.comment}</p>
                          <p className="text-sm text-muted-foreground mt-2">{review.date}</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteReview(review.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Manage Payments</h2>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-4">Booking ID</th>
                      <th className="text-left p-4">User</th>
                      <th className="text-left p-4">Amount</th>
                      <th className="text-left p-4">Method</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Date</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-border">
                        <td className="p-4">#{booking.id}</td>
                        <td className="p-4">{booking.userName}</td>
                        <td className="p-4 font-bold text-primary">${booking.totalPrice}</td>
                        <td className="p-4">
                          {booking.paymentMethod === 'credit_card' ? 'Credit Card' : 'Cash'}
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            booking.paymentStatus === 'paid'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {booking.paymentStatus}
                          </span>
                        </td>
                        <td className="p-4">{booking.bookingDate}</td>
                        <td className="p-4">
                          <Button size="sm" variant="outline">
                            Verify
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
