
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FeaturedCollections = () => {
  const collections = [
    {
      id: 1,
      title: "Men's Collection",
      description: "Tailored suits, premium shirts, and contemporary casual wear",
      image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&h=800&fit=crop&crop=face",
      category: "men",
      link: "/men"
    },
    {
      id: 2,
      title: "Women's Collection",
      description: "Elegant dresses, sophisticated blouses, and timeless pieces",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop&crop=face",
      category: "women",
      link: "/women"
    },
    {
      id: 3,
      title: "Children's Collection",
      description: "Stylish, comfortable, and durable clothing for every adventure",
      image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a5?w=600&h=800&fit=crop&crop=face",
      category: "children",
      link: "/children"
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="font-playfair text-3xl md:text-4xl font-bold text-navy mb-4">
            Our Collections
          </h3>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            Curated fashion for every member of your family, designed with sophistication and crafted for comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <div 
              key={collection.id} 
              className="group relative overflow-hidden rounded-lg bg-ivory shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {/* Image container */}
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent"></div>
              </div>
              
              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h4 className="font-playfair text-2xl font-bold mb-2">
                  {collection.title}
                </h4>
                <p className="font-inter text-sm mb-4 text-gray-200">
                  {collection.description}
                </p>
                <Link to={collection.link}>
                  <Button 
                    className="bg-gold hover:bg-gold/90 text-white font-inter font-semibold transition-all hover:scale-105"
                  >
                    Shop {collection.category === 'children' ? 'Kids' : collection.category.charAt(0).toUpperCase() + collection.category.slice(1)}
                  </Button>
                </Link>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/10 transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
