// pages/version.js
'use client'
import { useEffect, useState } from 'react';

const Version = () => {
  const [versionInfo, setVersionInfo] = useState(null);

  useEffect(() => {
    fetch('/version.json')
      .then((response) => response.json())
      .then((data) => {
        setVersionInfo(data);
      });
  }, []);

  if (!versionInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Version Info</h1>
      <p>{`${versionInfo.date}-${versionInfo.commit}`}</p>
      ok
    </div>
  );
};

export default Version;
