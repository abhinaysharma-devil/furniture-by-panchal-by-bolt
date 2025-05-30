import React from 'react';
import { aboutUsContent } from '../data/mockData';

const About: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-80 bg-gray-900 flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
            alt="Furniture craftsman" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">{aboutUsContent.title}</h1>
          <p className="text-white text-lg max-w-2xl mx-auto">
            Crafting beautiful furniture with passion and precision since 2005.
          </p>
        </div>
      </section>
      
      {/* About Content */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="prose prose-lg">
                <p className="text-gray-700 mb-4">
                  {aboutUsContent.description.split('\n\n')[0]}
                </p>
                <p className="text-gray-700 mb-4">
                  {aboutUsContent.description.split('\n\n')[1]}
                </p>
                <p className="text-gray-700">
                  {aboutUsContent.description.split('\n\n')[2]}
                </p>
              </div>
            </div>
            
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                alt="Furniture workshop" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Vision and Values */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-xl text-gray-700">{aboutUsContent.vision}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {aboutUsContent.values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary mb-4">
                  {index + 1}
                </div>
                <h3 className="font-semibold mb-2">{value}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aboutUsContent.teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <div className="h-64">
                  <img 
                    src={member.imgPath} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Experience the Difference</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Visit our showrooms to experience the quality and craftsmanship of our furniture firsthand.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contact" className="btn bg-white text-primary-900 hover:bg-gray-100">
              Contact Us
            </a>
            <a href="/categories" className="btn border border-white text-white hover:bg-white/10">
              Browse Collections
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;