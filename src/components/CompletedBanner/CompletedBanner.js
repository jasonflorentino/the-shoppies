import { useState } from 'react';

import './CompletedBanner.scss';

const CompletedBanner = ({ setVisibility }) => {
  const [inContainer, setInContainer] = useState(true);

  const closeModal = () => {
    if (inContainer) return;
    setVisibility(false);
  }

  return (
    <div className="CompletedBanner" onClick={closeModal}>
      <div 
        className="CompletedBanner__box"
        onMouseEnter={() => setInContainer(true)}
        onMouseLeave={() => setInContainer(false)}
      >
        Thank you!
      </div>
    </div>
  )
}

export default CompletedBanner;