
import React from 'react';
import CornerMarker from './CornerMarker';

const SlashDivider: React.FC = () => {
  return (
    <section className="relative h-4 w-full border-y border-zed-border/50">
      <div className="absolute inset-0 slash-pattern opacity-40" />
      <CornerMarker position="top-left" />
      <CornerMarker position="top-right" />
      <CornerMarker position="bottom-left" />
      <CornerMarker position="bottom-right" />
    </section>
  );
};

export default SlashDivider;
