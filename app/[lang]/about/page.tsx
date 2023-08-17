'use client';

import Link from 'next/link';
import React from 'react';

const About = () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 300);
  }).then(() => {
    return (
      <>
        <div className="text-9xl text-blue-400">About</div>
        <br />
        <br />
        <Link href="/">back</Link>;
      </>
    );
  });
};

export default About;
