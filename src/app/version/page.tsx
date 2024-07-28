// app/version/page.tsx
'use client'
import { useEffect, useState } from 'react';

interface VersionInfo {
  commit: string;
  date: string;
}

const Version = () => {
  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);

  useEffect(() => {
    fetch('/version.json')
      .then((response) => response.json())
      .then((data: VersionInfo) => {
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
    </div>
  );
};

export default Version;
