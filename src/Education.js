// src/Education.js
import React from 'react';
import './Education.css'; // Add a separate CSS file for styling

function Education() {
  return (
    <div className="education-container">
      <h1>E-Waste Education</h1>

      {/* Why Recycle E-Waste? */}
      <section className="education-section">
        <h2>Why Recycle E-Waste?</h2>
        <p>
          Electronic waste (e-waste) contains harmful materials like lead, mercury, and cadmium that can pollute the environment if not disposed of properly. Recycling e-waste helps:
        </p>
        <ul>
          <li>Reduce pollution and protect the environment.</li>
          <li>Conserve natural resources by recovering valuable materials like gold, silver, and copper.</li>
          <li>Prevent health risks associated with toxic substances.</li>
        </ul>
      </section>

      {/* How to Recycle E-Waste */}
      <section className="education-section">
        <h2>How to Recycle E-Waste</h2>
        <p>
          Follow these steps to recycle your e-waste responsibly:
        </p>
        <ol>
          <li><strong>Find a Recycling Center:</strong> Use our app to locate the nearest e-waste recycling center.</li>
          <li><strong>Prepare Your Items:</strong> Remove personal data and batteries from your devices.</li>
          <li><strong>Drop Off Your E-Waste:</strong> Take your items to the recycling center or schedule a pickup.</li>
        </ol>
      </section>

      {/* Benefits of Recycling */}
      <section className="education-section">
        <h2>Benefits of Recycling</h2>
        <p>
          Recycling e-waste has numerous benefits for the environment and society:
        </p>
        <ul>
          <li><strong>Environmental Protection:</strong> Reduces landfill waste and prevents soil and water contamination.</li>
          <li><strong>Resource Conservation:</strong> Recovers valuable materials for reuse in new products.</li>
          <li><strong>Energy Savings:</strong> Recycling uses less energy than mining and processing raw materials.</li>
        </ul>
      </section>

      {/* FAQs */}
      <section className="education-section">
        <h2>FAQs</h2>
        <div className="faq">
          <h3>What is e-waste?</h3>
          <p>
            E-waste refers to discarded electronic devices like smartphones, laptops, TVs, and appliances. These items often contain hazardous materials and should not be thrown in regular trash.
          </p>
        </div>
        <div className="faq">
          <h3>Can all electronics be recycled?</h3>
          <p>
            Most electronics can be recycled, but some items (like batteries) require special handling. Check with your local recycling center for specific guidelines.
          </p>
        </div>
        <div className="faq">
          <h3>Is recycling e-waste free?</h3>
          <p>
            Many recycling centers offer free drop-off services for e-waste. However, some items may incur a small fee. Contact your local center for details.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Education;