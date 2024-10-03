import React from 'react';
import styled from 'styled-components';

const EbookContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  position: relative; /* Allow positioning of the back button */
`;

const BookCover = styled.img`
  width: 200px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const BookTitle = styled.h2`
  font-size: 26px;
  color: #2e2e2e;
  text-align: center;
  margin-bottom: 10px;
`;

const BookSubtitle = styled.p`
  font-size: 18px;
  color: #757575;
  text-align: center;
  margin-bottom: 30px;
`;

const BookDescription = styled.p`
  font-size: 18px;
  color: #555;
  text-align: center;
  margin-bottom: 30px;
  line-height: 1.5;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 12px 24px;
  font-size: 18px;
  cursor: pointer;
  margin: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const BackButton = styled.img`
  position: absolute; /* Position the image in the container */
  top: 20px; /* Distance from the top */
  left: 20px; /* Distance from the left */
  width: 40px; /* Width of the back button image */
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1); /* Slightly enlarge on hover */
  }
`;

const PriceSection = styled.div`
  font-size: 22px;
  color: #444;
  margin-top: 10px;
  text-align: center;
`;

const OfferText = styled.p`
  font-size: 18px;
  color: #ff6f61;
  text-align: center;
`;

const EbookPage = () => {
  const handleDownloadSample = () => {
    console.log('Downloading Java Secrets Sample...');
    window.open('/src/assets/JavaSecrets_promo.pdf', '_blank');
  };

  const handlePurchase = () => {
    console.log('Redirecting to Purchase Page...');
    window.location.href = '/purchase-page';
  };

  const handleBack = () => {
    console.log('Redirecting to Landing Page...');
    window.location.href = '/'; // Replace with your landing page URL
  };

  return (
    <EbookContainer>
      <BackButton 
        src="src/assets/back-icon.png" // Path to your back button image
        alt="Back to Landing Page"
        onClick={handleBack}
      />
      <BookCover src="src/assets/cover.png" alt="Java Secrets Book Cover" />
      <BookTitle>Java Secrets</BookTitle>
      <BookSubtitle>
        Master Java through real-world examples, crafted by developers, for developers.
      </BookSubtitle>
      <BookDescription>
        Skip the theory and dive straight into practical Java knowledge. "Java Secrets" guides you through real coding challenges with examples from the field—perfect for anyone looking to elevate their skills.
      </BookDescription>

      <Button onClick={handleDownloadSample}>Download Free Sample</Button>
      <Button onClick={handlePurchase}>Buy Full Version</Button>

      <PriceSection>Price: $24.99</PriceSection>
      <OfferText>Special Launch Offer: Get a 15% discount if purchased today!</OfferText>
    </EbookContainer>
  );
};

export default EbookPage;
