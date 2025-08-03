import React from 'react';
import './PeopleCardSlider.css';

// Example person data
const people = [
  {
    name: 'Anita Sharma',
    profession: 'Electrician',
    description: 'Expert in residential and industrial wiring with 5+ years of experience.',
    image: '/images/anita.jpg',
    bgColor: '#B4D4FF',
  },
  {
    name: 'Rahul Mehta',
    profession: 'Plumber',
    description: 'Specialist in bathroom fitting and water systems.',
    image: '/images/rahul.jpg',
    bgColor: '#FAD9E6',
  },
  {
    name: 'Seema Yadav',
    profession: 'Carpenter',
    description: 'Customized furniture and modular kitchen expert.',
    image: '/images/seema.jpg',
    bgColor: '#D0F0E8',
  },
  {
    name: 'Amit Verma',
    profession: 'Painter',
    description: 'Interior and exterior painting with artistic finishes.',
    image: '/images/amit.jpg',
    bgColor: '#FFF1AC',
  },
  {
    name: 'Priya Das',
    profession: 'Mason',
    description: 'Strong foundation and structural work specialist.',
    image: '/images/priya.jpg',
    bgColor: '#E4DBF5',
  },
];

const PeopleCardSlider = () => {
  return (
    <div className="people-slider-wrapper">
      <h2 className="people-title">Our Top Professionals</h2>

      <div className="people-card-container">
        {people.map((person, index) => (
          <div
            className="people-card"
            key={index}
            style={{ backgroundColor: person.bgColor }}
          >
            <div className="person-image-wrapper">
              <img src={person.image} alt={person.name} />
            </div>
            <h3>{person.name}</h3>
            <p className="profession">{person.profession}</p>
            <p className="description">{person.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeopleCardSlider;
