"use client";

import { useState, ChangeEvent } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  BookOpen,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (
      formData.name &&
      formData.email &&
      formData.subject &&
      formData.message
    ) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }, 3000);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+977 1-4123456", "+977 9841234567"],
      color: "bg-blue-500",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@bookstore.com", "support@bookstore.com"],
      color: "bg-red-500",
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["Thamel, Kathmandu", "Nepal"],
      color: "bg-green-500",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon - Sat: 9:00 AM - 8:00 PM", "Sunday: 10:00 AM - 6:00 PM"],
      color: "bg-purple-500",
    },
  ];

  const faqs = [
    {
      question: "Do you offer home delivery?",
      answer:
        "Yes, we provide free home delivery across Kathmandu Valley for orders above Rs. 1000.",
    },
    {
      question: "Can I return a book?",
      answer:
        "Yes, you can return books within 7 days if they are in original condition.",
    },
    {
      question: "Do you have a membership program?",
      answer:
        "Yes! Join our Reader's Club and get exclusive discounts and early access to new arrivals.",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="bg-linear-to-r from-amber-600 to-orange-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <MessageSquare className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-lg text-amber-100 max-w-2xl mx-auto">
            We'd love to hear from you!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all"
            >
              <div
                className={`${info.color} w-14 h-14 rounded-full flex items-center justify-center mb-4`}
              >
                <info.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3">{info.title}</h3>
              {info.details.map((detail, idx) => (
                <p key={idx} className="text-gray-600 text-sm">
                  {detail}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <Send className="text-amber-600" /> Send Us a Message
            </h2>

            {submitted && (
              <div className="mb-4 bg-green-100 text-green-700 p-3 rounded-lg">
                ✓ Message sent successfully!
              </div>
            )}

            <div className="space-y-4">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full border-2 p-3 rounded-xl"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border-2 p-3 rounded-xl"
              />

              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full border-2 p-3 rounded-xl"
              />

              <input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full border-2 p-3 rounded-xl"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Message"
                className="w-full border-2 p-3 rounded-xl resize-none"
              />

              <button
                onClick={handleSubmit}
                className="w-full bg-linear-to-r from-amber-600 to-orange-600 text-white py-4 rounded-xl font-bold"
              >
                Send Message
              </button>
            </div>
          </div>

          <div className="space-y-8">
            <iframe
              src="https://www.google.com/maps?q=Thamel,Kathmandu&output=embed"
              className="w-full h-64 rounded-2xl border-0"
              loading="lazy"
              allowFullScreen
            />

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="text-amber-600" /> FAQs
              </h3>
              {faqs.map((faq, i) => (
                <div key={i} className="mb-4">
                  <h4 className="font-bold">{faq.question}</h4>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
