
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="luxury-container py-8 md:py-12">
      <div className="page-header">
        <h1 className="page-title">Contact Us</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We'd love to hear from you. Get in touch with our team for inquiries, support, or to schedule a visit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        {/* Contact Form */}
        <div className="bg-card border rounded-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this regarding?"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                rows={5}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full md:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>

        {/* Contact Information */}
        <div>
          {/* Quick Contact */}
          <div className="bg-card border rounded-lg p-6 md:p-8 mb-6">
            <h2 className="text-2xl font-bold mb-6">Quick Contact</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Customer Service</h3>
                <p className="text-muted-foreground">
                  For general inquiries and support
                </p>
                <p className="mt-1">
                  <a
                    href="mailto:info@elitewheels.com"
                    className="text-primary hover:underline"
                  >
                    info@elitewheels.com
                  </a>
                </p>
                <p>
                  <a href="tel:+918800000000" className="hover:underline">
                    +91 880-000-0000
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium">Sales Department</h3>
                <p className="text-muted-foreground">
                  For inquiries about our vehicles and pricing
                </p>
                <p className="mt-1">
                  <a
                    href="mailto:sales@elitewheels.com"
                    className="text-primary hover:underline"
                  >
                    sales@elitewheels.com
                  </a>
                </p>
                <p>
                  <a href="tel:+918811000000" className="hover:underline">
                    +91 881-100-0000
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium">Service Department</h3>
                <p className="text-muted-foreground">
                  For maintenance and repair inquiries
                </p>
                <p className="mt-1">
                  <a
                    href="mailto:service@elitewheels.com"
                    className="text-primary hover:underline"
                  >
                    service@elitewheels.com
                  </a>
                </p>
                <p>
                  <a href="tel:+918822000000" className="hover:underline">
                    +91 882-200-0000
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-card border rounded-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Business Hours</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Monday - Friday:</span>
                <span>10:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Saturday:</span>
                <span>11:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Sunday:</span>
                <span>11:00 AM - 5:00 PM</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="text-xl font-bold mb-4">Our Locations</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Mumbai Showroom</h4>
                  <p className="text-muted-foreground">
                    123 Marine Drive, Nariman Point, Mumbai 400021
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Delhi Showroom</h4>
                  <p className="text-muted-foreground">
                    456 Connaught Place, New Delhi 110001
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Bangalore Showroom</h4>
                  <p className="text-muted-foreground">
                    789 MG Road, Bangalore 560001
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Find Us</h2>
        <div className="h-96 bg-muted rounded-lg overflow-hidden border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1655241324015!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
