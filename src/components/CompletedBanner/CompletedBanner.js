import { useState } from 'react';

import './CompletedBanner.scss';

const CompletedBanner = ({ setVisibility }) => {
  const [inContainer, setInContainer] = useState(true);

  const closeModal = () => {
    if (inContainer) return;
    setVisibility(false);
  }

  const linkedinUrl = 'https://www.linkedin.com/in/jasonflorentino/';
  const gitHubUrl   = 'https://github.com/jasonflorentino';

  return (
    <div className="CompletedBanner" onClick={closeModal}>
      <div 
        className="CompletedBanner__box"
        onMouseEnter={() => setInContainer(true)}
        onMouseLeave={() => setInContainer(false)}
      >
        <h2 className="CompletedBanner__heading">🎬 That's a wrap!</h2>
        <p className="CompletedBanner__body">Thank you for making your nominations. Feel free to continue browsing this page or check out its creator. 🙌</p>
        <div className="CompletedBanner__actions">
          <button className="CompletedBanner__button--close" onClick={()=>setVisibility(false)}>Continue browsing</button>
          <a 
            className="CompletedBanner__button--visit"
            href={linkedinUrl} 
            target='_blank' 
            rel='noreferrer'
          >
            Jason on Linkedin
          </a>
          <a 
            className="CompletedBanner__button--visit"
            href={gitHubUrl} 
            target='_blank' 
            rel='noreferrer'
          >
            Jason on GitHub
          </a>
        </div>
      </div>
    </div>
  )
}

export default CompletedBanner;