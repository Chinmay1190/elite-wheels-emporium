
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="luxury-container py-8 md:py-12">
      <div className="page-header">
        <h1 className="page-title">About Elite Wheels Emporium</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Your premier destination for luxury automotive excellence in India
        </p>
      </div>
      
      {/* Company Introduction */}
      <section className="my-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-lg text-muted-foreground mb-4">
            Founded in 2010, Elite Wheels Emporium began as a small luxury car dealership in Mumbai. 
            With a vision to provide exceptional automotive experiences to enthusiasts across India, 
            we've grown into a nationwide premium vehicle marketplace.
          </p>
          <p className="text-muted-foreground">
            Today, we're proud to offer an extensive collection of the world's finest superbikes, 
            luxury cars, and sports cars, all with comprehensive service packages and an unwavering 
            commitment to customer satisfaction.
          </p>
        </div>
        <div className="relative h-80 overflow-hidden rounded-lg">
          <img 
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070" 
            alt="Luxury car showroom" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      
      {/* Our Mission */}
      <section className="my-12 bg-muted/30 p-8 md:p-12 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-8">Our Mission</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-xl font-semibold mb-3">Excellence</h3>
            <p className="text-muted-foreground">
              To source and provide only the finest vehicles that meet our stringent quality standards, 
              ensuring that every customer receives an exceptional product.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-xl font-semibold mb-3">Experience</h3>
            <p className="text-muted-foreground">
              To create a seamless, enjoyable purchasing journey from browsing to delivery, 
              with personalized service that exceeds expectations.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-xl font-semibold mb-3">Education</h3>
            <p className="text-muted-foreground">
              To share our extensive automotive knowledge with our customers, 
              helping them make informed decisions that align perfectly with their needs and desires.
            </p>
          </div>
        </div>
      </section>
      
      {/* Team */}
      <section className="my-12">
        <h2 className="text-3xl font-bold text-center mb-8">Our Leadership Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "Vikram Mehta",
              position: "Founder & CEO",
              image: "https://randomuser.me/api/portraits/men/32.jpg",
              bio: "Former racing driver with 15+ years in luxury automotive retail."
            },
            {
              name: "Priya Sharma",
              position: "Chief Operations Officer",
              image: "https://randomuser.me/api/portraits/women/44.jpg",
              bio: "Automotive industry expert with international dealership experience."
            },
            {
              name: "Rajesh Singh",
              position: "Head of Sales",
              image: "https://randomuser.me/api/portraits/men/86.jpg",
              bio: "Passionate about connecting enthusiasts with their perfect vehicle."
            },
            {
              name: "Aisha Patel",
              position: "Customer Experience Director",
              image: "https://randomuser.me/api/portraits/women/65.jpg",
              bio: "Dedicated to creating memorable luxury buying experiences."
            }
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-primary font-medium">{member.position}</p>
              <p className="text-sm text-muted-foreground mt-2">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Showrooms */}
      <section className="my-12">
        <h2 className="text-3xl font-bold text-center mb-8">Our Showrooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              city: "Mumbai",
              address: "123 Marine Drive, Nariman Point, Mumbai 400021",
              phone: "+91 22 1234 5678",
              image: "https://images.unsplash.com/photo-1562911791-c7a97b729ec5?q=80&w=2574"
            },
            {
              city: "Delhi",
              address: "456 Connaught Place, New Delhi 110001",
              phone: "+91 11 2345 6789",
              image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2734"
            },
            {
              city: "Bangalore",
              address: "789 MG Road, Bangalore 560001",
              phone: "+91 80 3456 7890",
              image: "https://images.unsplash.com/photo-1615293889204-6db03c596e04?q=80&w=2670"
            }
          ].map((showroom, index) => (
            <div key={index} className="overflow-hidden border rounded-lg bg-card">
              <div className="h-48 overflow-hidden">
                <img 
                  src={showroom.image} 
                  alt={`${showroom.city} Showroom`} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold">{showroom.city}</h3>
                <p className="text-sm text-muted-foreground mt-2">{showroom.address}</p>
                <p className="text-sm font-medium mt-1">{showroom.phone}</p>
                <Button variant="link" className="px-0 mt-2" asChild>
                  <Link to="/contact">Get Directions</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="my-12 bg-gradient-to-r from-primary/90 to-luxury-red text-white rounded-lg p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Experience Luxury Today</h2>
        <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
          Visit one of our showrooms or browse our online collection to discover your perfect luxury vehicle.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" variant="secondary" asChild>
            <Link to="/products">Explore Collection</Link>
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary" asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
